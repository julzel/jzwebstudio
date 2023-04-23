import * as React from 'react';

// local imports
import './Instructions.css';

const Instructions = () => {
  return (
    <div className="instructions">
      <h3>Instructions for Playing Conway's Game of Life</h3>

      <ol>
        <li>
          Set up the initial state: The Game of Life is played on a grid of
          cells, which can be represented on paper or on a computer screen.
          Start by setting up an initial state by coloring some cells black to
          represent live cells, and leaving others white to represent dead
          cells. You can set up any initial configuration you like, but it's
          often best to start with something simple, like a glider or a block.
        </li>

        <li>
          Apply the rules: After setting up the initial state, apply the rules
          of the Game of Life to determine the next generation. The rules are
          simple:
          <ul>
            <li>
              Any live cell with fewer than two live neighbors dies, as if by
              underpopulation.
            </li>
            <li>
              Any live cell with two or three live neighbors lives on to the
              next generation.
            </li>
            <li>
              Any live cell with more than three live neighbors dies, as if by
              overpopulation.
            </li>
            <li>
              Any dead cell with exactly three live neighbors becomes a live
              cell, as if by reproduction.
            </li>
          </ul>
        </li>

        <li>
          Repeat the process: After applying the rules to the initial state, you
          should have a new state. Use this state as the basis for the next
          generation, and apply the rules again to get a new state. Repeat this
          process as many times as you like, and watch as the patterns evolve
          and change over time.
        </li>

        <li>
          Explore different patterns: Experiment with different initial patterns
          to see how they evolve over time. Try creating patterns that move or
          rotate, or that form intricate shapes or patterns. You can also use
          computer programs or online simulations to explore the Game of Life in
          more detail.
        </li>
      </ol>

      <p>That's it! Have fun playing Conway's Game of Life.</p>
    </div>
  );
};

export default Instructions;
