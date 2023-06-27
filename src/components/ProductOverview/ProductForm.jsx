import {useSelector} from "react-redux";
import StarRating from "../../lib/StarRating.jsx";
import ProductStyles from "./ProductStyles.jsx";
import SizeSelector from "../../lib/SizeSelector";
import {useEffect, useState} from "react";

export default function ProductForm({product, selectedStyle, ...props}) {
  const [formState, setFormState] = useState({
    quantity: 1,
    size: null,
    style: selectedStyle.style_id,
  });

  useEffect(() => {
    setFormState({
      quantity: 1,
      size: null,
      style: selectedStyle.style_id,
    })
  }, [product, selectedStyle])

  return (
    <div className="product-form">
      <StarRating />
      <h4>{product.category}</h4>
      <h2>{product.name}</h2>
      <h6>{product.default_price}</h6>

      <div className="row">
        <ProductStyles styles={product.styles} {...props} />
      </div>

      {/*<div className="row">
        <SizeSelector skus={selectedStyle.skus} onSelect={(x) => setFormState({...formState, size: x})}/>

        {formState.size && (
          <input type="number"
                 value={formState.quantity}
                 onChange={(e) => setFormState({...formState, quantity: e.target.value})}
                 disabled={!formState.size}
                 max={
                   formState.size
                     ? selectedStyle.skus[formState.size].quantity
                     : 0
                 }
          />
        )}
      </div>*/}

    </div>
  )
}