import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { blue, pink } from '@mui/material/colors';
import { Car, Track, TrackLayout } from './index';

interface SetupCategory {
  Front: string;
  Rear: string;
  Explanation: string;
}

export interface CarSetupProps {
  'Body Height Adjustment': SetupCategory;
  'Anti-Roll Bar': SetupCategory;
  'Damping Ratio (Compression)': SetupCategory;
  'Damping Ratio (Expansion)': SetupCategory;
  'Natural frequency': SetupCategory;
  'Negative Camber Angle': SetupCategory;
  'Toe Angle': SetupCategory;
  'Initial Torque': SetupCategory;
  'Acceleration Sensitivity': SetupCategory;
  'Braking Sensitivity': SetupCategory;
  'Front/Rear Torque distribution': SetupCategory;
  Tips: string;
}

interface CarSetupDisplayProps {
  setup: CarSetupProps;
  variables: {
    car: Car | null;
    track: Track | null;
    layout: TrackLayout | null;
  };
}

const CarSetupDisplay: React.FC<CarSetupDisplayProps> = ({
  setup,
  variables,
}) => {
  const { car, track, layout } = variables;
  const adjustments = Object.entries(setup);
  if (!adjustments.length) {
    return null;
  }
  return (
    <Box my={4}>
      <Paper elevation={1} sx={{ padding: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Track:{' '}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {track?.course}
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Layout:{' '}
        </Typography>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1" gutterBottom>
            {layout?.layoutName || ''}
          </Typography>
          {layout?.trackMap && (
            <img
              src={layout.trackMap || ""}
              alt={`${layout?.layoutName || ''} track map`}
              style={{ width: 200 }}
            />
          )}
        </Box>
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Car:{' '}
        </Typography>
        <Box display="flex" flexDirection="column">
          <Typography variant="subtitle1" gutterBottom>
            {car?.car}
          </Typography>
          {car?.picture && (
            <img
              src={car.picture || ""}
              alt={car?.car || ''}
              style={{ width: 200 }}
            />
          )}
        </Box>
      </Paper>
      <Paper elevation={1} sx={{ padding: 3 }}>
        {adjustments.map(([key, value], idx) => {
          if (key === 'Tips') {
            return (
              <Box key={idx} mt={3}>
                <Typography variant="h6" gutterBottom>
                  {key}
                </Typography>
                <Typography variant="body1">{value}</Typography>
              </Box>
            );
          }

          return (
            <Box key={idx} mb={2}>
              <Typography variant="h6" gutterBottom>
                {key}
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  sx={{
                    border: `2px solid ${blue[600]}`,
                    p: 0.5,
                    flex: 1,
                    borderRadius: 1,
                    bgcolor: blue[50],
                    mr: 0.5,
                  }}
                >
                  Front: {value.Front}
                </Typography>
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  sx={{
                    border: `2px solid ${pink[600]}`,
                    p: 0.5,
                    flex: 1,
                    borderRadius: 1,
                    bgcolor: pink[50],
                    ml: 0.5,
                  }}
                >
                  Rear: {value.Rear}
                </Typography>
              </Box>
              <Typography variant="subtitle2">
                Exp: {value.Explanation}
              </Typography>
              {idx !== Object.entries(setup).length - 1 && (
                <Divider sx={{ my: 2 }} />
              )}
            </Box>
          );
        })}
      </Paper>
    </Box>
  );
};

export default CarSetupDisplay;
