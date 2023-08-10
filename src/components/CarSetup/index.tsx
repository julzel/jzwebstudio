import React, { useState } from 'react';
import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Button,
  Grid,
} from '@mui/material';
import useGTData from '../../hooks/useGTData';
import { useChatGPT } from '../../hooks/useChatGPT';

interface Car {
  car: string;
  picture: string;
}

interface Track {
  course: string;
  countryFlag: string;
  layouts: Array<{
    layoutName: string;
    trackType: string;
    length: string;
    reversible: string;
    rain: string;
    trackMap: string | null;
  }>;
}

const responseExample =
  "When setting up the Toyota Trueno AE86 (or any car) for the Tsukuba Circuit in Gran Turismo, consider the game's unique physics and feedback mechanisms. Here's a more game-specific guideline to set up the AE86 for Tsukuba in Gran Turismo: Suspension: Ride Height: Lower the car slightly to reduce the center of gravity and improve handling. Spring Rates: Given Tsukuba's track layout, aim for a more responsive setup. Increase the spring rates, but keep the rear slightly softer than the front to promote oversteer. Dampers: Match damping to the spring rates. A balance between compression and rebound ensures stable cornering. Camber and Toe: A slight negative camber (1-2 degrees) can improve cornering grip. Toe settings can be kept close to neutral. Tires: Use sports soft or racing hard tires for competitive laptimes, as they provide a good balance between grip and wear. Brakes: Brake Balance: In GT, the AE86 can benefit from a slightly forward brake bias (like 5:4) to maintain stability during braking. Differential: A 1.5-way or 2-way LSD will greatly improve corner exit. Set initial torque to a moderate value, with acceleration sensitivity a bit higher to help with corner exits. Aerodynamics: In Gran Turismo, the aerodynamics modifications are often more pronounced than in real life. Start with mild aero adjustments to avoid making the car too grippy or too slidey. Transmission: Adjust the final gear ratio based on the longest straight of Tsukuba. Ensure you're near the top of your power band (not necessarily redlining) at the end of the straight.";

const CarSetup = () => {
  const { cars, tracks, loading } = useGTData();
  const { handleSendMessage, isLoading, response } = useChatGPT();
  const [track, setTrack] = useState<Track>();
  const [car, setCar] = useState<Car>();

  const handleSubmit = (
    selectedTrack: Track = {
      course: '',
      countryFlag: '',
      layouts: [],
    },
    selectedCar: Car = {
      car: '',
      picture: '',
    }
  ) => {
    handleSendMessage({
      prompt: `I'm planning to race a ${selectedCar.car} on ${selectedTrack.course} on Gran Turismo. Can you provide tuning recommendations and driving tips specifically for this combination? Please provide the best overall setup in an easy to read format. (Use this example: ${responseExample} for reference))`,
    });
  };

  const handleSubmission = () => {
    handleSubmit(track, car);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={tracks}
            value={track}
            onChange={(event, newValue) => setTrack(newValue as Track | undefined)}
            getOptionLabel={(option: Track) => option.course}
            renderInput={(params) => (
              <TextField {...params} label="Track Name" variant="outlined" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={cars}
            value={car}
            onChange={(event, newValue) => setCar(newValue as Car | undefined)}
            getOptionLabel={(option: Car) => option.car}
            renderInput={(params) => (
              <TextField {...params} label="Car Model" variant="outlined" />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmission}
            disabled={isLoading}
          >
            Get Setup
          </Button>
        </Grid>
      </Grid>

      <Box m={4}>
        {response?.content ||
          'Select a car and track to get setup recommendations.'}
      </Box>
    </Container>
  );
};

export default CarSetup;
