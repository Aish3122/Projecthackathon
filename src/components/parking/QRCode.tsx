import React from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
}

export const QRCode: React.FC<QRCodeProps> = ({ value, size = 120 }) => {
  // Generate a deterministic pattern based on the value
  const hash = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const gridSize = 9;
  const cellSize = size / gridSize;
  
  // Generate pattern
  const cells: boolean[][] = [];
  for (let i = 0; i < gridSize; i++) {
    cells[i] = [];
    for (let j = 0; j < gridSize; j++) {
      // Create position patterns (corners)
      const isCornerPattern = 
        (i < 3 && j < 3) || 
        (i < 3 && j >= gridSize - 3) || 
        (i >= gridSize - 3 && j < 3);
      
      if (isCornerPattern) {
        const localI = i % 3;
        const localJ = j % 3;
        cells[i][j] = localI === 0 || localI === 2 || localJ === 0 || localJ === 2 || (localI === 1 && localJ === 1);
      } else {
        // Data pattern based on hash
        cells[i][j] = ((hash + i * j + i + j) % 3) !== 0;
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg">
      <rect width={size} height={size} fill="white" />
      {cells.map((row, i) =>
        row.map((cell, j) =>
          cell ? (
            <rect
              key={`${i}-${j}`}
              x={j * cellSize}
              y={i * cellSize}
              width={cellSize}
              height={cellSize}
              fill="black"
            />
          ) : null
        )
      )}
    </svg>
  );
};
