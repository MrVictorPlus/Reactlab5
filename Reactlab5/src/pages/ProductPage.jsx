import { useParams } from 'react-router-dom';
import products from '../data/products.json';
import NotFoundPage from './NotFoundPage';

function ProductPage() {
  const { id } = useParams();
  const isValidId = /^\d+$/.test(id);
  if (!isValidId) return <NotFoundPage />;

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <NotFoundPage />;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Цена: {product.price} лей</p>
    </div>
  );
}

export default ProductPage;
