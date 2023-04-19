import React from 'react';

interface CellProps {
  status: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const Cell: React.FC<CellProps> = ({ status, onClick, disabled }) => {
  const cellStyle: React.CSSProperties = {
    backgroundColor: status ? 'black' : 'white',
    border: '1px solid black',
    cursor: disabled ? 'default' : 'pointer',
    height: '20px',
    width: '20px',
  };

  return <div style={cellStyle} onClick={disabled ? undefined : onClick} />;
};
