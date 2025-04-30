# Лабораторная работа №5. Формы, валидация и работа с API

---

## Запуск проекта

1. Клонируйте репозиторий:

```bash
git clone ...
cd ...
```

2. Установите зависимости:

```bash
npm install
```

3. Запустите проект:

```bash
npm run dev
```

4. Приложение откроется по адресу `http://localhost:5137`.

> Убедитесь, что ваш API доступен по адресу вида `https://67faa9908ee14a5426284ec6.mockapi.io/products`.

---

## Описание лабораторной работы

**Цель:**  
Научиться загружать данные с внешнего API, реализовать формы с клиентской валидацией и отправкой данных на сервер. Отказаться от локальных данных.

**Этапы:**

1. Создание ресурса `products` в mockapi.io.
2. Загрузка и отображение товаров с сервера.
3. Реализация формы добавления товара.
4. Валидация формы.
5. Отправка POST-запроса на сервер.

---

## Документация проекта

### Компоненты:

- `ProductList.jsx` — загружает список товаров с mockapi.io и отображает их.
- `ProductForm.jsx` — форма для добавления товара с валидацией.

### Используемые библиотеки:

- `axios` — для HTTP-запросов.
- `react-loading-skeleton` — для загрузки.
- `react-router-dom` — для переходов между страницами.

---

## Примеры использования

### Загрузка товаров с сервера (`ProductList.jsx`)

```jsx
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
```

### Отображение Skeleton во время загрузки

```jsx
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
```

### Отправка нового товара (`ProductForm.jsx`)

```jsx
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
  if (Object.keys(newErrors).length > 0) return;

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

    await axios.post("https://67faa9908ee14a5426284ec6.mockapi.io/products", newProduct);
    setLoading(false);
    navigate("/");
  } catch (error) {
    console.error("Ошибка при добавлении товара:", error);
    setLoading(false);
  }
};
```

### Пример формы добавления

```jsx
<form onSubmit={handleSubmit}>
  <div>
    <label>Название:</label>
    <input value={name} onChange={(e) => setName(e.target.value)} />
    {errors.name && <p>{errors.name}</p>}
  </div>
  <div>
    <label>Цена:</label>
    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
    {errors.price && <p>{errors.price}</p>}
  </div>
  <!-- Остальные поля аналогично -->
  <button type="submit" disabled={loading}>
    {loading ? "Загрузка..." : "Добавить товар"}
  </button>
</form>
```

---

## Ответы на контрольные вопросы

1. **Что такое клиентская валидация и какова её роль?**  
   Это проверка введённых пользователем данных прямо в браузере, до отправки на сервер. Позволяет улучшить UX и снизить нагрузку на сервер.

2. **Что такое API и как он работает?**  
   API (Application Programming Interface) — это способ взаимодействия между разными программами. В вебе обычно позволяет клиенту (браузеру) получать/отправлять данные с сервера.

3. **Что такое REST API и чем он отличается от обычного API?**  
   REST API — это тип API, который работает по принципам REST и использует стандартные HTTP-методы (GET, POST, PUT, DELETE) для работы с ресурсами. В отличие от общего API, REST API строго следует архитектурным правилам и оперирует URL-адресами. API — это общее понятие интерфейса взаимодействия программ, а REST API — один из его конкретных форматов.

4. **Как загрузить данные с сервера при монтировании компонента?**  
   С помощью хука `useEffect`, вызвав внутри него `axios.get` или `fetch`.

   ```jsx
   useEffect(() => {
     axios.get(URL).then(res => setData(res.data));
   }, []);
   ```

---

## Использованные источники

- [React Docs](https://reactjs.org)
- [Axios](https://axios-http.com)
- [MockAPI](https://mockapi.io)
- [React Router](https://reactrouter.com)
- [React Loading Skeleton](https://www.npmjs.com/package/react-loading-skeleton)

---

## Дополнительные аспекты

- Реализована Skeleton-загрузка для лучшего UX.
- Форма проверяет корректность ввода до отправки.
- Можно расширить функциональность: редактирование, удаление, фильтрация товаров и т.п.
- Навигация реализована с помощью `react-router-dom`.
```
