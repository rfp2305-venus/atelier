import RelatedCard from './RelatedCard.jsx';
import { Box, Typography } from '@mui/material';

export default function RelatedProducts({ relatedProducts }) {

  let cardList = relatedProducts.map((productID)=> <RelatedCard productID={productID} key={productID}/>);

  return (
    <>
      <Typography component='p' className="title">RELATED PRODUCTS</Typography>
      <div className="carousel" id="related-products">
        {cardList}
      </div>
    </>

  );
}