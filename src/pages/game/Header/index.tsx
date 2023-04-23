import React from 'react';

// local imports
import './Header.css';
import Glider from '../../../images/gol/glider.png';

function Header() {
  return (
    <>
      <header className="gol-header">
        <h1 className="title">Conway's Game of Life</h1>
        <h2 className="subtitle">A cellular automaton simulation</h2>
      </header>
      <div className="gol-description">
        <img src={Glider} alt="Glider figure setup" />
        <p>
          The Game of Life is not a traditional game, but rather a mathematical
          simulation. It is a zero-player game, meaning that its evolution is
          determined by its initial state, requiring no further input. The game
          is named after John Horton Conway, who was inspired by the idea of
          creating a set of rules that could create complex behavior from simple
          patterns. Despite its simplicity, the Game of Life has fascinated
          mathematicians and computer scientists since its creation. It is
          Turing complete, which means that it can simulate any computer
          algorithm or program. The game has been used to model a wide range of
          phenomena, including the spread of disease, the behavior of fluids,
          and the growth of crystals.
        </p>
      </div>
    </>
  );
}

export default Header;
