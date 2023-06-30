import react from 'react';
import { useEffect, useState } from 'react';
import { Button, Card, CardMedia, CardContent, Typography } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';


export default function OutfitCard() {
  return (

    <Card className="card" id='add-to-outfit'>
      <Button variant='contained'>Add to Outfit</Button>
    </Card>
  );
}