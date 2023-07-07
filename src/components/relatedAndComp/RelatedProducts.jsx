import RelatedCard from './RelatedCard.jsx';
import { Typography, Card, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel';


export default function RelatedProducts({ relatedProducts }) {

  let cardList = relatedProducts.map((productID)=> <RelatedCard productID={productID} key={productID}/>);
  const sliderItems = 2;
  // const sliderItems = (relatedProducts.length > 3) ? 3 : relatedProducts.length;
  // console.log('sliderItems', sliderItems);
  const items = [];

  for (let i = 0; i < relatedProducts.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      <Card key={i.toString()}>
        <Grid>
          {items.push(
            relatedProducts.slice(i, i + sliderItems).map((productID) => {
              return <RelatedCard productID={productID} key={productID}/>;
            })
          )}
        </Grid>
      </Card>;
    }
  }

  return (
    <div data-testid='related-products'>
      <Typography component='p' className="title">RELATED PRODUCTS</Typography>
      <Carousel component='span' id="related-products" width='800px' autoplay={false} interval={null}>
        <span className='carousel'>{cardList}</span>
      </Carousel>
    </div>
  );
}