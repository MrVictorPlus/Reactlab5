import { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://67faa9908ee14a5426284ec6.mockapi.io/products');
        setProducts(response.data);
        setLoading(false);  
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <p>Загрузка...</p>
          <Skeleton height={200} count={5} />
        </div>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
  
}

export default ProductList;
