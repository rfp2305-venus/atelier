import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


export default function Characteristics({characteristic, id, charValue}) {

  let charChart = {
    Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };

  let marks = [
    {
      value: 0,
      label: charChart[characteristic][0],
    },
    {
      value: 5,
      label: charChart[characteristic][4],
    },

  ];

  const valuetext = (value) => {
    return `${value}`;
  };

  return (
    <Box ml={3} sx={{ width: 300}}>
      <Typography variant="h8" gutterBottom>{characteristic}</Typography>
      <Slider
        max={5}
        aria-label="Custom marks"
        defaultValue={charValue}
        getAriaValueText={valuetext}
        // step={10}
        valueLabelDisplay="auto"
        marks={marks}
        disabled
      />
    </Box>
  );

}




