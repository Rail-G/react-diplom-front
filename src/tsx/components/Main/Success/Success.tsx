import {useNavigate} from 'react-router-dom';

export function Success() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/');
  };
  return (
    <section className="top-sales text-center">
      <h2>Товар успешно оформлен</h2>
      <div className="background-image success-img"></div>
      <p className="text-center">Благодарим за покупку</p>
      <button onClick={onClick} className="btn btn-outline-primary">
        Главная страница
      </button>
    </section>
  );
}
