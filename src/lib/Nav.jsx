export default function Nav({products, onClick} ) {

  return (
    <div>
      {products.map((product) => (
        <span onClick={() => onClick(product.id)}>{product.name}</span>
      ))}
    </div>
  )
}