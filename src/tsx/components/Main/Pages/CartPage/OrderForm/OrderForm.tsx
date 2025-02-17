import React, {useState} from 'react';
import {useAppDispatch} from '../../../../../hook/hook';
import {
  changeOrderQuantity,
  sendOrderDataToServer,
} from '../../../../../redux/slices/OrderSlice';
import {CartFinallyOrder} from '../../CardItemPage/CardItemTools/CardItemTools';
import {getLocalStorageItem} from '../../../../../tools';

interface UserInfo {
  phone: string;
  address: string;
}

export function OrderForm({orders}: {orders: CartFinallyOrder[]}) {
  const [userInfo, setUserInfo] = useState<UserInfo>({phone: '', address: ''});
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({...prev, [e.target.id]: e.target.value}));
  };

  const onChangeCheckBox = () => setIsChecked(!isChecked);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const arr = getLocalStorageItem();
    if (arr.length > 0) {
      const itemsDataToServer = arr.map((item) => ({
        id: item.id,
        price: item.price,
        count: item.quantity,
      }));
      dispatch(
        sendOrderDataToServer({owner: userInfo, items: itemsDataToServer}),
      );
      dispatch(changeOrderQuantity(0));
      setUserInfo({phone: '', address: ''});
      setIsChecked(!isChecked);
    }
  };
  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
        <form onSubmit={onSubmit} className="card-body">
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              value={userInfo.phone}
              onChange={onChange}
              id="phone"
              placeholder="Ваш номер телефона"
              pattern="[0-9]{11}"
              minLength={11}
              maxLength={11}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              value={userInfo.address}
              onChange={onChange}
              id="address"
              placeholder="Адрес доставки"
              required
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={onChangeCheckBox}
              className="form-check-input"
              id="agreement"
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          {isChecked && orders.length != 0 ? (
            <button type="submit" className="btn btn-outline-secondary">
              Оформить
            </button>
          ) : (
            <button
              disabled
              type="submit"
              className="btn btn-outline-secondary"
            >
              Оформить
            </button>
          )}
        </form>
      </div>
    </section>
  );
}
