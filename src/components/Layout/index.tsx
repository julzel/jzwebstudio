import React, { ReactNode } from 'react';

// styles
import './Layout.css';

// local imports
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="body">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
