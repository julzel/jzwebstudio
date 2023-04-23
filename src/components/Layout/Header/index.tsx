import React from 'react';
import { FaUtensils, FaBars } from 'react-icons/fa';
import Logo from '../../../images/logos/logo.png';
import './Header.css';
import { useMobile } from '../../../hooks/useMobile';
import { Link } from 'react-router-dom';

function Header() {
  const isMobile = useMobile();

  return (
    <header className="main-header">
      {isMobile && (
        <button className="menu-icon">
          <FaBars />
        </button>
      )}
      <img src={Logo} alt="Logo" className="logo" />
      <Link to="/my-kitchen" className="link">
        <FaUtensils />
      </Link>
    </header>
  );
}

export default Header;
