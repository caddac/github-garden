import React from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { format } from 'date-fns';

const TimelineControl = ({ selectedDate, onDateChange }) => {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography gutterBottom>
        {format(selectedDate, 'MMMM d, yyyy')}
      </Typography>
      <Slider
        value={((selectedDate - new Date('2024-01-01')) / (new Date('2024-12-31') - new Date('2024-01-01'))) * 100}
        onChange={onDateChange}
        aria-labelledby="timeline-slider"
        marks={[
          { value: 0, label: 'Jan' },
          { value: 25, label: 'Apr' },
          { value: 50, label: 'Jul' },
          { value: 75, label: 'Oct' },
          { value: 100, label: 'Dec' },
        ]}
      />
    </Box>
  );
};

export default TimelineControl; 