import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Магазин одежды</h1>
      <nav>
        <Link to="/">Главная</Link> | <Link to="/cart">Корзина</Link> | <Link to="/about">О нас</Link>| <Link to="/add-product">Форма</Link>
      </nav>
    </header>
  );
}

export default Header;
