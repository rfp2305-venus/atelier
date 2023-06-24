import RelatedCard from './RelatedCard.jsx';

export default function RelatedProducts(props) {
  console.log('relatedproducts', props);
  // let cardList = props.map((product)=> <RelatedCard />);
  return (
    <>
      <h3 className="title">Related Products</h3>
      <div className="carousel" id="related-products">
        <RelatedCard />
        <RelatedCard />
        <RelatedCard />
        <RelatedCard />
        <RelatedCard />
      </div>
    </>
  );
}