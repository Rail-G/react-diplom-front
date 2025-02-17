import {Link, useNavigate} from 'react-router-dom';
import {CartFinallyOrder} from '../CardItemPage/CardItemTools/CardItemTools';
import {OrderForm} from './OrderForm/OrderForm';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../../hook/hook';
import {getLocalStorageItem} from '../../../../tools';
import {Success} from '../../Success/Success';
import {Loader} from '../../Loader/Loader';
import {Error} from '../../Error/Error';
import {EmptyCart} from '../../EmptyCart/EmptyCart';
import {changeErrorMessage} from '../../../../redux/slices/OrderSlice';

export function CartPage() {
  const [orders, setOrders] = useState<CartFinallyOrder[]>([]);
  const dispatch = useAppDispatch();
  const {serverResponse, loading, error} = useAppSelector(
    (state) => state.order,
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (serverResponse) {
      localStorage.removeItem('cartItems');
    }
    if (!serverResponse) {
      const orders = getLocalStorageItem();
      setOrders(orders);
    }
  }, [serverResponse]);
  const onDelete = (id: number): void => {
    const orders = getLocalStorageItem();
    const filteredOrders = orders.filter((order) => order.id != id);
    localStorage.setItem('cartItems', JSON.stringify(filteredOrders));
    setOrders(filteredOrders);
  };
  const onErrorClick = () => {
    dispatch(changeErrorMessage());
    navigate('/cart');
  };
  return (
    <>
      {loading && <Loader />}
      {error && <Error errorText={error} onClick={onErrorClick} />}
      {!loading && serverResponse && error == null && <Success />}
      {!loading && !serverResponse && error == null && orders.length == 0 && (
        <EmptyCart />
      )}
      {!loading && !serverResponse && error == null && orders.length > 0 && (
        <>
          <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td scope="row">1</td>
                    <td>
                      <Link to={`/catalog/${order.id}`}>{order.title}</Link>
                    </td>
                    <td>{order.size}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price}</td>
                    <td>{order.price * order.quantity}</td>
                    <td>
                      <button
                        onClick={() => onDelete(order.id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5} className="text-right">
                    Общая стоимость
                  </td>
                  <td>
                    {orders.reduce(
                      (accum, next) => accum + next.price * next.quantity,
                      0,
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <OrderForm orders={orders} />
        </>
      )}
    </>
  );
}
