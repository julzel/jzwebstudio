import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Box className="flex flex-col items-center gap-4" aria-live="polite">
      <Typography id="counter-value" variant="h6" component="p">
        Count: {count}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => setCount((prev) => prev + 1)}
        aria-describedby="counter-value"
      >
        Increment Counter
      </Button>
    </Box>
  );
};

export default Counter;
