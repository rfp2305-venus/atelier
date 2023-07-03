import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function NewCharInput({characteristic, id, charValue}) {

  let charChart = {
    Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">{characteristic}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value={1} control={<Radio size="small"/>} label={charChart[characteristic][0]} labelPlacement="bottom" />
        <FormControlLabel value={2} control={<Radio size="small"/>} label={charChart[characteristic][1]} labelPlacement="bottom"/>
        <FormControlLabel value={3} control={<Radio size="small"/>} label={charChart[characteristic][2]} labelPlacement="bottom"/>
        <FormControlLabel value={4} control={<Radio size="small"/>} label={charChart[characteristic][3]} labelPlacement="bottom"/>
        <FormControlLabel value={5} control={<Radio size="small"/>} label={charChart[characteristic][4]} labelPlacement="bottom"/>
      </RadioGroup>
    </FormControl>
  );

}



{/* <FormControlLabel
value="bottom"
control={<Radio />}
label="Bottom"
labelPlacement="bottom"
/> */}
