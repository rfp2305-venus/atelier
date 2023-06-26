import RelatedCard from './RelatedCard.jsx';

export default function RelatedProducts({ relatedProducts }) {
  // console.log('props in relatedproducts: ', relatedProducts);
  let cardList = relatedProducts.map((productID)=> <RelatedCard productID={productID} key={productID}/>);
  return (
    <>
      <h3 className="title">Related Products</h3>
      <div className="carousel" id="related-products">
        {cardList}
      </div>
    </>
  );
}