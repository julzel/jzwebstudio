import React from 'react';
// import { NavLink } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

// local imports
import Logo from '../../../images/logos/logo.png';
import './Header.css';

function Header() {
  return (
    <header className="main-header">
      <img src={Logo} alt="Logo" className="logo" />
      <a
        href="https://github.com/julzel"
        target="_blank"
        rel="noopener noreferrer"
        className="link"
      >
        <FaGithub />
      </a>
    </header>
  );
}

export default Header;
