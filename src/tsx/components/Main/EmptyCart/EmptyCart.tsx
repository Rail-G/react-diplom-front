import {useNavigate} from 'react-router-dom';

export function EmptyCart() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/catalog');
  };
  return (
    <section className="top-sales text-center">
      <h2>К сожалению корзина пустая</h2>
      <div className="background-image empty-cart-img"></div>
      <p className="text-center">Это отличный повод, чтобы наполнить её ;)</p>
      <button onClick={onClick} className="btn btn-outline-primary">
        Перейти в каталог
      </button>
    </section>
  );
}
