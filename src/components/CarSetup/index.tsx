import React, { useState } from "react";
import { Container, TextField, Button, Grid } from "@mui/material";

interface CarSetupProps {
  handleSubmit: (track: string, car: string) => void;
}

const CarSetup: React.FC<CarSetupProps> = ({ handleSubmit }) => {
  const [track, setTrack] = useState<string>("");
  const [car, setCar] = useState<string>("");

  const handleSubmission = () => {
    handleSubmit(track, car);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Track Name"
            value={track}
            onChange={(e) => setTrack(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Car Model"
            value={car}
            onChange={(e) => setCar(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmission}
          >
            Get Setup
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CarSetup;
