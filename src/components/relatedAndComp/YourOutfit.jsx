import OutfitCard from './OutfitCard.jsx';

export default function YourOutfit() {
  return (
    <>
      <h3 className="title">Your Outfit</h3>
      <div className="carousel" id="your-outfit">
        <OutfitCard />
        <OutfitCard />
        <OutfitCard />
        <OutfitCard />
        <OutfitCard />
      </div>
    </>
  );
}