import OutfitCard from './OutfitCard.jsx';
import { Box, Typography } from '@mui/material';

export default function YourOutfit() {
  return (
    <>
      <Typography component='p' className="title">YOUR OUTFIT</Typography>
      <Box className="carousel" id="your-outfit">
        <OutfitCard />
        <OutfitCard />
        <OutfitCard />
        <OutfitCard />
        <OutfitCard />
      </Box>
    </>
  );
}