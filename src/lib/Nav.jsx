export default function Nav({products, selectedProduct, onClick} ) {

  return (
    <select onChange={(x) => {onClick(x.target.value)}} value={selectedProduct}>
      {products.map((product) => (
        <option value={product.id}>
          {product.name}
        </option>
      ))}
    </select>
  )
}