export default function Nav({products, onClick} ) {

  return (
    <div>
      {products.map((product) => (
        <span
          key={product.id}
          onClick={() => onClick(product.id)}
          style={{marginRight: '10px', cursor: 'pointer'}}
        >
          {product.name}
        </span>
      ))}
    </div>
  )
}