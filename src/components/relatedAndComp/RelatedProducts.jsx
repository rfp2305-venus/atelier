import RelatedCard from './RelatedCard.jsx';
import { Typography, Card, Grid } from '@mui/material';
// import Carousel from 'react-material-ui-carousel';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function RelatedProducts({ relatedProducts }) {

  let cardList = relatedProducts.map((productID)=> <RelatedCard productID={productID} key={productID}/>);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div data-testid='related-products'>
      <Typography component='p' className="title">RELATED PRODUCTS</Typography>
      <Carousel responsive={responsive}>
        {cardList}
      </Carousel>
    </div>
  );
}