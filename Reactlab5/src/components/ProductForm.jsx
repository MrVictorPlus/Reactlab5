import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!name) newErrors.name = "Название товара обязательно";
    if (!description) newErrors.description = "Описание товара обязательно";
    if (!price || isNaN(price)) newErrors.price = "Цена должна быть числом";
    if (!image) newErrors.image = "Изображение обязательно";
    if (!category) newErrors.category = "Категория обязательна";
    if (!sizes) newErrors.sizes = "Размеры обязательны";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      const newProduct = {
        name,
        description,
        price,
        image,
        category,
        sizes: sizes.split(","),
      };

      const response = await axios.post("https://67faa9908ee14a5426284ec6.mockapi.io/products", newProduct);
      
      setLoading(false);
      
      navigate("/"); 
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Добавить товар</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Название:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        
        <div>
          <label>Описание:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && <p>{errors.description}</p>}
        </div>

        <div>
          <label>Цена:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {errors.price && <p>{errors.price}</p>}
        </div>

        <div>
          <label>Изображение:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          {errors.image && <p>{errors.image}</p>}
        </div>

        <div>
          <label>Категория:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          {errors.category && <p>{errors.category}</p>}
        </div>

        <div>
          <label>Размеры (через запятую):</label>
          <input
            type="text"
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            required
          />
          {errors.sizes && <p>{errors.sizes}</p>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Добавить товар"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
