import { Box, Container, Typography } from '@mui/material';

const Footer = () => (
  <Box component="footer" className="bg-white py-6 shadow-inner" role="contentinfo">
    <Container maxWidth="lg">
      <Typography variant="body2" align="center" color="text.secondary">
        © {new Date().getFullYear()} My Site. All rights reserved.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
