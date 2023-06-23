import {useSelector} from "react-redux";
import StarRating from "../../lib/StarRating.jsx";
import ProductStyles from "./ProductStyles.jsx";

export default function ProductForm() {
  const {product} = useSelector(({productDetail}) => productDetail);

  return (
    <div>
      <StarRating />
      <h4>{product.category}</h4>
      <h2>{product.name}</h2>
      <h6>{product.default_price}</h6>
      <ProductStyles />
    </div>
  )
}