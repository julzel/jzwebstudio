import React from 'react';

interface CellProps {
  status: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const Cell: React.FC<CellProps> = ({ status, onClick, disabled }) => {
  const cellStyle: React.CSSProperties = {
    backgroundColor: status ? 'black' : 'white',
    border: '1px solid gray',
    cursor: disabled ? 'default' : 'pointer',
    height: '40px',
    width: '40px',
  };

  return <div style={cellStyle} onClick={disabled ? undefined : onClick} />;
};
