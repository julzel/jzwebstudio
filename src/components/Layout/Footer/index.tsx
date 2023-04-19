import React from 'react';

// local imports
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>Julio Zeledón - {new Date().getFullYear()}</p>
      <p>🇨🇷 San José - Costa Rica 🇨🇷</p>
      <p>© Todos los derechos</p>
    </footer>
  );
};

export default Footer;
