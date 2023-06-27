import {useSelector} from "react-redux";
import StarRating from "../../lib/StarRating.jsx";
import ProductStyles from "./ProductStyles.jsx";

export default function ProductForm({product, ...props}) {

  return (
    <div className="product-form">
      <StarRating />
      <h4>{product.category}</h4>
      <h2>{product.name}</h2>
      <h6>{product.default_price}</h6>
      <ProductStyles styles={product.styles} {...props} />
    </div>
  )
}