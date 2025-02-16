import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../../hook/hook';
import {changeServerResponse} from '../../../redux/slices/OrderSlice';

export function Success() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClick = () => {
    navigate('/');
    setTimeout(() => {
      dispatch(changeServerResponse());
    }, 500);
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
