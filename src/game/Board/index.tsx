import React, { useState, useCallback, useEffect } from 'react';

// local imports
import './Board.css';

import { Grid } from './Grid';

interface BoardProps {
  initialRows?: number;
  initialColumns?: number;
}

const Board: React.FC<BoardProps> = ({
  initialRows = 15,
  initialColumns = 15,
}) => {
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [rows, setRows] = useState(initialRows);
  const [columns, setColumns] = useState(initialColumns);
  const [gridData, setGridData] = useState<boolean[][]>(
    Array.from({ length: rows }, () => Array(columns).fill(false))
  );

  const resetGrid = () => {
    setGridData(Array.from({ length: rows }, () => Array(columns).fill(false)));
  };

  const onCellClick = (row: number, col: number) => {
    const newGridData = [...gridData];
    newGridData[row][col] = !newGridData[row][col];
    setGridData(newGridData);
  };

  const updateRows = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 5) {
      setRows(value);
      setGridData(
        Array.from({ length: value }, () => Array(columns).fill(false))
      );
    }
  };

  const updateColumns = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 5) {
      setColumns(value);
      setGridData(Array.from({ length: rows }, () => Array(value).fill(false)));
    }
  };

  const toggleBoardStatus = () => {
    setDisabled(!disabled);
  };

  const getAliveNeighbors = useCallback(
    (row: number, col: number) => {
      const neighbors = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        /* [0, 0] */ [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      return neighbors.reduce((count, [dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns) {
          return count + (gridData[newRow][newCol] ? 1 : 0);
        }

        return count;
      }, 0);
    },
    [gridData, rows, columns]
  );

  const runSimulationIteration = useCallback(() => {
    setGridData((currentGrid) => {
      return currentGrid.map((rowData, rowIdx) =>
        rowData.map((cellData, colIdx) => {
          const aliveNeighbors = getAliveNeighbors(rowIdx, colIdx);

          if (cellData) {
            return aliveNeighbors === 2 || aliveNeighbors === 3;
          } else {
            return aliveNeighbors === 3;
          }
        })
      );
    });
  }, [getAliveNeighbors]);

  const startSimulation = () => {
    // runSimulationIteration();
    setSimulationRunning(true);
  };

  useEffect(() => {
    if (simulationRunning) {
      const interval = setInterval(runSimulationIteration, 500);
      return () => clearInterval(interval);
    }
  }, [gridData, runSimulationIteration, simulationRunning]);

  return (
    <div className="board">
      <Grid
        rows={rows}
        columns={columns}
        gridData={gridData}
        onCellClick={onCellClick}
        disabled={disabled}
      />
      <div className="board-actions">
        <div className="board-settings">
          <label>
            Rows:{' '}
            <input type="number" value={rows} onChange={updateRows} min="5" />
          </label>
          <label>
            Columns:{' '}
            <input
              type="number"
              value={columns}
              onChange={updateColumns}
              min="5"
            />
          </label>
        </div>
        <div className="board-buttons">
          <button onClick={resetGrid}>Reset</button>
          <button onClick={toggleBoardStatus}>
            {disabled ? 'Unfreeze' : 'Freeze'} Board
          </button>
          <button onClick={startSimulation}>Start Simulation</button>
        </div>
      </div>
    </div>
  );
};

export default Board;
