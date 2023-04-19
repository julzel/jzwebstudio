import React from 'react';

// local imports
import Header from './Header';
import Board from './Board';
import Instructions from './Instructions';
import Footer from './Footer';

import './GameOfLife.css';

const GameOfLife = () => {
  return (
    <div className="gol">
      <Header />
      <Board />
      <Instructions />
      <Footer />
    </div>
  );
};

export default GameOfLife;
