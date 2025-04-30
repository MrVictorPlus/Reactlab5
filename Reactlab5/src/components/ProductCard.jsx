import { useState, useEffect } from "react";

function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product.sizes]);

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="price">{product.price} лей</p>
      <div className="sizes">
        {product.sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeChange(size)}
            className={selectedSize === size ? "active" : ""}
          >
            {size}
          </button>
        ))}
      </div>
      <button className="add-to-cart">Добавить в корзину</button>
    </div>
  );
}

export default ProductCard;
