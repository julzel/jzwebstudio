import { Box, Stack } from '@mui/material';

const HeroVisual = () => (
  <Box
    className="group"
    sx={{
      position: 'relative',
      borderRadius: 'var(--app-radius-card)',
      overflow: 'hidden',
      minHeight: { xs: 280, sm: 360 },
      padding: { xs: '2rem', sm: '2.5rem' },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background:
        'linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(124, 58, 237, 0.15)), linear-gradient(0deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9))',
      boxShadow: '0 30px 80px -40px rgba(6, 182, 212, 0.35)',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        backgroundSize: '32px 32px',
        backgroundImage:
          'linear-gradient(rgba(37, 99, 235, 0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.16) 1px, transparent 1px)',
        opacity: 0.25,
      },
      '@keyframes pulseEdge': {
        '0%': { opacity: 0.35 },
        '50%': { opacity: 0.95 },
        '100%': { opacity: 0.35 },
      },
      '&:hover .edge': {
        animation: 'pulseEdge 1.6s cubic-bezier(0.22, 1, 0.36, 1) infinite',
      },
    }}
  >
    <Stack spacing={3} sx={{ position: 'relative', width: '100%', maxWidth: 320 }}>
      <Box
        sx={{
          position: 'relative',
          borderRadius: '20px',
          padding: '1.5rem',
          background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85), rgba(14, 184, 166, 0.15))',
          border: '1px solid rgba(20, 184, 166, 0.25)',
          boxShadow: '0 20px 40px -30px rgba(20, 184, 166, 0.6)',
        }}
      >
        <Box
          sx={{
            width: '70%',
            height: 16,
            borderRadius: '999px',
            background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.6), rgba(56, 189, 248, 0.4))',
          }}
        />
        <Stack spacing={1.5} sx={{ mt: 2 }}>
          {[0.65, 0.88, 0.52].map((scale) => (
            <Box
              key={scale}
              sx={{
                width: `${scale * 100}%`,
                height: 10,
                borderRadius: '999px',
                backgroundColor: 'rgba(148, 163, 184, 0.25)',
              }}
            />
          ))}
        </Stack>
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            gap: 1.5,
          }}
        >
          {[0, 1, 2].map((idx) => (
            <Box
              key={idx}
              sx={{
                flex: 1,
                height: 36,
                borderRadius: '12px',
                background: 'rgba(59, 130, 246, 0.18)',
                border: '1px solid rgba(37, 99, 235, 0.2)',
              }}
            />
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
          borderRadius: '24px',
          padding: '1rem',
          background: 'rgba(15, 23, 42, 0.72)',
          border: '1px solid rgba(94, 234, 212, 0.25)',
          ml: 'auto',
          width: '70%',
          boxShadow: '0 12px 30px -24px rgba(59, 130, 246, 0.75)',
        }}
      >
        <Stack spacing={1}>
          {[0.9, 0.7, 0.5].map((scale) => (
            <Box
              key={scale}
              sx={{
                width: `${scale * 100}%`,
                height: 8,
                borderRadius: '999px',
                backgroundColor: 'rgba(148, 163, 184, 0.2)',
              }}
            />
          ))}
        </Stack>
      </Box>

      <Box
        className="edge"
        sx={{
          position: 'absolute',
          top: '28%',
          left: '18%',
          width: '40%',
          height: 1.5,
          background: 'linear-gradient(90deg, rgba(20, 184, 166, 0), rgba(20, 184, 166, 0.8))',
          opacity: 0.5,
        }}
      />
      <Box
        className="edge"
        sx={{
          position: 'absolute',
          bottom: '22%',
          left: '28%',
          width: 1.5,
          height: '36%',
          background: 'linear-gradient(0deg, rgba(37, 99, 235, 0), rgba(37, 99, 235, 0.85))',
          opacity: 0.55,
        }}
      />

      {[0, 1, 2].map((idx) => (
        <Box
          key={idx}
          sx={{
            position: 'absolute',
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: '1px solid rgba(226, 232, 240, 0.35)',
            backgroundColor: 'rgba(226, 232, 240, 0.12)',
            transform: 'translate(-50%, -50%)',
            top: ['30%', '58%', '68%'][idx],
            left: ['18%', '45%', '70%'][idx],
            boxShadow: '0 0 12px rgba(14, 184, 166, 0.35)',
          }}
        />
      ))}
    </Stack>
  </Box>
);

export default HeroVisual;
