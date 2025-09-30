import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { FiMenu } from 'react-icons/fi';

const Header = () => (
  <AppBar component="header" position="sticky" elevation={0} color="transparent">
    <Toolbar className="flex justify-between px-4 py-3 sm:px-6">
      <Box className="flex items-center gap-2">
        <IconButton
          aria-label="Open navigation menu"
          edge="start"
          color="primary"
          sx={{ display: { md: 'none' } }}
        >
          <FiMenu size={20} />
        </IconButton>
        <Typography
          variant="h6"
          component="a"
          href="#main-content"
          className="font-bold text-slate-900 no-underline"
        >
          My Site
        </Typography>
      </Box>
      <Box
        component="nav"
        aria-label="Primary navigation"
        className="hidden items-center gap-2 md:flex"
      >
        <Button color="primary" variant="text" href="#main-content">
          Home
        </Button>
        <Button color="primary" variant="outlined" href="#get-started">
          Get Started
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
