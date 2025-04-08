import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

const SCALE_FACTOR = 40; // pixels per foot

const GardenVisualization = ({ plants, gardenLayout, selectedDate }) => {
  const { dimensions } = gardenLayout;
  const bedWidth = dimensions.bed_width * SCALE_FACTOR;
  const bedLength = dimensions.bed_length * SCALE_FACTOR;

  // Calculate total dimensions
  const totalWidth = (dimensions.columns * (dimensions.bed_width + dimensions.path_width)) * SCALE_FACTOR;
  const totalHeight = (dimensions.rows * (dimensions.bed_length + dimensions.path_width)) * SCALE_FACTOR;

  const getBedPosition = (row, col) => {
    const x = col * (dimensions.bed_width + dimensions.path_width) * SCALE_FACTOR;
    const y = row * (dimensions.bed_length + dimensions.path_width) * SCALE_FACTOR;
    return { x, y };
  };

  const renderSquareFootGrid = (bedId, x, y) => {
    const squares = [];
    for (let row = 0; row < dimensions.bed_length; row++) {
      for (let col = 0; col < dimensions.bed_width; col++) {
        squares.push(
          <Box
            key={`${bedId}-${row}-${col}`}
            sx={{
              position: 'absolute',
              left: col * SCALE_FACTOR,
              top: row * SCALE_FACTOR,
              width: SCALE_FACTOR,
              height: SCALE_FACTOR,
              border: '1px dashed rgba(0,0,0,0.2)',
            }}
          />
        );
      }
    }
    return squares;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        mt: 2,
        position: 'relative',
        height: totalHeight + 100, // Add padding
        width: totalWidth + 100, // Add padding
        backgroundColor: '#f5f5f5',
        overflow: 'auto',
      }}
    >
      {/* Render beds */}
      {gardenLayout.beds.map((bed) => {
        const position = getBedPosition(bed.row, bed.col);
        return (
          <Box
            key={bed.id}
            sx={{
              position: 'absolute',
              left: position.x + 50, // Add padding offset
              top: position.y + 50, // Add padding offset
              width: bedWidth,
              height: bedLength,
              backgroundColor: '#8d6e63',
              border: '2px solid #5d4037',
              borderRadius: 1,
            }}
          >
            {/* Bed label */}
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                top: -20,
                left: 0,
                color: '#5d4037',
                fontWeight: 'bold',
              }}
            >
              {bed.id}
            </Typography>

            {/* Square foot grid */}
            {renderSquareFootGrid(bed.id, position.x, position.y)}

            {/* Plants in this bed */}
            {plants
              .filter(plant => plant.location === bed.id)
              .map(plant => (
                <Box
                  key={`${plant.name}-${plant.planting_date}`}
                  sx={{
                    position: 'absolute',
                    left: (plant.square.x - 1) * SCALE_FACTOR,
                    top: (plant.square.y - 1) * SCALE_FACTOR,
                    width: SCALE_FACTOR,
                    height: SCALE_FACTOR,
                    backgroundColor: plant.color,
                    opacity: 0.8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 1,
                      zIndex: 1,
                    },
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'white',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.7rem',
                      textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
                    }}
                  >
                    {plant.name}
                  </Typography>
                </Box>
              ))}
          </Box>
        );
      })}


    </Paper>
  );
};

export default GardenVisualization; 