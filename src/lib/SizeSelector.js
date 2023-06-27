import React from "react";

export default function SizeSelector({skus, onSelect}) {

  return (
    <select name="sizes" id="skus-select" onChange={(e) => onSelect(e.target.value)}>

      <option value={null}> select a size </option>

      {Object.keys(skus).map((key) => (
        <option key={key} value={key} className={
          skus[key].quantity >= 1
            ? 'sku sku-in-stock'
            : 'sku sku-out-of-skock'
        }>
          {skus[key].size}
        </option>
      ))}
    </select>
  )
}