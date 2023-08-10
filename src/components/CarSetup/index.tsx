import React, { useState } from 'react';
import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';
import useGTData from '../../hooks/useGTData';
import { useChatGPT } from '../../hooks/useChatGPT';
import CarSetupDisplay, { CarSetupProps } from './CarSetupDisplay';

export interface Car {
  car: string;
  picture: string;
}

export interface TrackLayout {
  layoutName: string;
  trackType: string;
  length: string;
  reversible: string;
  rain: string;
  trackMap: string | null;
};

export interface Track {
  course: string;
  countryFlag: string;
  layouts: Array<TrackLayout>;
}

const promptExample = `
you're a sim racing mechanic engineer for Gran Turismo. Please provide the initial 
recommendations for the specified car and track in a structured format for easy data extraction. 

Set the car's Suspension and Differencial Gear for these settings:
- Body Height Adjustment (unit: mm)
- Anti-Roll Bar (unit: Lv.)
- Damping Ratio Compression) (unit: %)
- Damping Ratio Expansion) (unit: %)
- Natural frequency (unit: Hz)
- Negative Camber Angle (unit: deg.)
- Toe Angle (unit: deg.)
- Initial Torque (unit: Lv.)
- Acceleration Sensitivity (unit: Lv.)
- Braking Sensitivity (unit: Lv.)
- Front/Rear Torque distribution (unit: none)

Use the following json format and provide an explanation for the chosen setting value:

{
  "Acceleration Sensitivity": {
    "Front": "[value] Lv.",
    "Rear": "[value] Lv",
    "Explanation": "[value]"
  },
  "Body Height Adjustment": {
    "Front": "[value] mm",
    "Rear": "[value] mm",
    "Explanation": "[value]"
  },
  // ... (continue for other suspension and differential settings)
  "Tips": "[value]"
}

make sure that you're returning
- Damping Ratio Compression
- Damping Ratio Expansion
and that the string you send is valid json format.
`;

const CarSetup = () => {
  const { cars, tracks, loading } = useGTData();
  const { handleSendMessage, isLoading, response } = useChatGPT();

  const [track, setTrack] = useState<Track | null>(null);
  const [car, setCar] = useState<Car | null>(null);
  const [layout, setLayout] = useState<TrackLayout | null>(null);

  const handleSubmit = (
    selectedTrack: Track | null = null,
    selectedCar: Car | null = null,
    selectedLayout: any = null // Added parameter for selected layout
  ) => {
    if (selectedCar && selectedTrack && selectedLayout) {
      handleSendMessage({
        prompt: `In order to race a ${selectedCar.car} on ${selectedTrack.course} (${selectedLayout.layoutName}) suppose ${promptExample}. Add driving tips for the track and car at the end.`,
      });
    }
  };

  const handleSubmission = () => {
    handleSubmit(track, car, layout); // Updated to pass layout
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
            onChange={(event, newValue) => {
              setTrack(newValue);
              setLayout(null); // Reset the layout when a new track is selected
            }}
            getOptionLabel={(option: Track) => option.course}
            isOptionEqualToValue={(option: Track, value: Track) =>
              option.course === value.course
            }
            renderInput={(params) => (
              <TextField {...params} label="Track Name" variant="outlined" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={track ? track.layouts : []} // Layout options based on selected track
            value={layout}
            onChange={(event, newValue) => setLayout(newValue)}
            getOptionLabel={(option) => option.layoutName}
            renderInput={(params) => (
              <TextField {...params} label="Layout Name" variant="outlined" />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={cars}
            value={car}
            onChange={(event, newValue) => setCar(newValue)}
            getOptionLabel={(option: Car) => option.car}
            isOptionEqualToValue={(option: Car, value: Car) =>
              option.car === value.car
            }
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
            disabled={isLoading || !track || !car || !layout} // Ensuring a layout is selected
          >
            Get Setup
          </Button>
        </Grid>
      </Grid>

      {isLoading && (
        <Box display="flex" justifyContent="center" mt={8}>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && response && (
        <CarSetupDisplay variables={{ track, layout, car }} setup={response as CarSetupProps} />
      )}
    </Container>
  );
};

export default CarSetup;
