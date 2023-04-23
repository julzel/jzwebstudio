import React from 'react';
import { Cell } from '../Cell';

interface GridProps {
  rows: number;
  columns: number;
  gridData: boolean[][];
  onCellClick: (row: number, col: number) => void;
  disabled: boolean;
}

export const Grid: React.FC<GridProps> = ({
  rows,
  columns,
  gridData,
  onCellClick,
  disabled,
}) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 40px)`,
    gridTemplateRows: `repeat(${rows}, 40px)`,
  };

  return (
    <div style={gridStyle}>
      {gridData.map((rowData, rowIdx) =>
        rowData.map((cellData, colIdx) => (
          <Cell
            key={`${rowIdx}-${colIdx}`}
            status={cellData}
            onClick={() => onCellClick(rowIdx, colIdx)}
            disabled={disabled}
          />
        ))
      )}
    </div>
  );
};
