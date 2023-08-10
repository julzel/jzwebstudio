import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

// styles
import './Layout.css';

import Header from '../Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <Box component="main" py={4}>
        {children}
      </Box>
    </div>
  );
};

export default Layout;
