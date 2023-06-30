import OutfitCard from './OutfitCard';
import AddToOutfit from './AddToOutfit';
import { Box, Typography } from '@mui/material';


export default function YourOutfit() {
  return (
    <>
      <Typography component='p' className="title">YOUR OUTFIT</Typography>
      <div className="carousel" id="your-outfit">
        <AddToOutfit />
        <OutfitCard />
        <OutfitCard />
        <OutfitCard />
      </div>
    </>
  );
}