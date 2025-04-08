import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { parseISO, isWithinInterval } from 'date-fns';
import YAML from 'yaml';
import GardenVisualization from './components/GardenVisualization';
import TimelineControl from './components/TimelineControl';

// Import the raw YAML content
const plantsYamlContent = `
plants:
  - name: "Tomato"
    location: "Bed-1"
    square: { x: 1, y: 1 }
    planting_date: "2024-03-15"
    harvest_date: "2024-07-15"
    color: "#FF0000"
  
  - name: "Basil"
    location: "Bed-2"
    square: { x: 2, y: 3 }
    planting_date: "2024-04-01"
    harvest_date: "2024-09-01"
    color: "#00FF00"
  
  - name: "Pepper"
    location: "Bed-3"
    square: { x: 1, y: 2 }
    planting_date: "2024-03-20"
    harvest_date: "2024-08-15"
    color: "#FFA500"

garden_layout:
  dimensions:
    bed_width: 3  # feet
    bed_length: 7  # feet
    path_width: 2  # feet
    total_beds: 12
    rows: 2
    columns: 6
  beds:
    - id: "Bed-1"
      row: 0
      col: 0
    - id: "Bed-2"
      row: 0
      col: 1
    - id: "Bed-3"
      row: 0
      col: 2
    - id: "Bed-4"
      row: 0
      col: 3
    - id: "Bed-5"
      row: 0
      col: 4
    - id: "Bed-6"
      row: 0
      col: 5
    - id: "Bed-7"
      row: 1
      col: 0
    - id: "Bed-8"
      row: 1
      col: 1
    - id: "Bed-9"
      row: 1
      col: 2
    - id: "Bed-10"
      row: 1
      col: 3
    - id: "Bed-11"
      row: 1
      col: 4
    - id: "Bed-12"
      row: 1
      col: 5
`;

// Parse plant data
const plantData = YAML.parse(plantsYamlContent);

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#ff9800',
    },
  },
});

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visiblePlants, setVisiblePlants] = useState([]);

  useEffect(() => {
    // Filter plants that are present on the selected date
    const filteredPlants = plantData.plants.filter(plant => {
      const plantingDate = parseISO(plant.planting_date);
      const harvestDate = parseISO(plant.harvest_date);
      return isWithinInterval(selectedDate, { start: plantingDate, end: harvestDate });
    });
    setVisiblePlants(filteredPlants);
  }, [selectedDate]);

  const handleDateChange = (event, newValue) => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    const dateRange = endDate - startDate;
    const selectedDate = new Date(startDate.getTime() + (newValue / 100) * dateRange);
    setSelectedDate(selectedDate);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Garden Timeline
        </Typography>
        
        <TimelineControl
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        
        <GardenVisualization
          plants={visiblePlants}
          gardenLayout={plantData.garden_layout}
          selectedDate={selectedDate}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App; 