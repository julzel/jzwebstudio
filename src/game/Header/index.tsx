import React from 'react';

// local imports
import './Header.css';

function Header() {
  return (
    <header className="gol-header">
      <h1 className="title">Conway's Game of Life</h1>
      <h2 className="subtitle">A cellular automaton simulation</h2>
      <div className="description">
        <p>
          Conway's Game of Life is a famous cellular automaton that simulates
          the behavior of cells in a grid. Each cell can be in one of two
          states: alive or dead. The game is famous for the intricate patterns
          that emerge from simple rules governing the birth, survival, and death
          of cells in each generation.
        </p>
        <p>
          The game was invented by British mathematician John Conway in 1970 and
          has since become a popular subject of study in computer science and
          mathematics. It has also been used to model various natural phenomena,
          such as the spread of forest fires and the growth of bacterial
          colonies. The game is Turing complete, which means that it can
          simulate any algorithm that a computer can execute, making it a
          powerful tool for exploring the limits of computation.
        </p>
      </div>
    </header>
  );
}

export default Header;
