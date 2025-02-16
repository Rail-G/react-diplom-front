import {useNavigate} from 'react-router-dom';
import '../../../../style/MenuTools.css';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hook/hook';
import {changeSearch} from '../../../redux/slices/CardsSlice';
import {changeOrderQuantity} from '../../../redux/slices/OrderSlice';
export function MenuTools() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const {orderQuantity} = useAppSelector((state) => state.order);
  const onClickHandler = () => {
    navigate('/catalog');
    dispatch(changeSearch({search: value, categoryId: '0'}));
    setValue('');
    setVisible(false);
  };
  const onClick = () => {
    if (!visible) {
      setVisible(true);
      return;
    }
    if (visible && value.trim()) {
      onClickHandler();
    } else {
      setVisible(false);
    }
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (visible && value.trim()) {
      onClickHandler();
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedValue = e.target.value;
    if (changedValue.trim() || value.trim()) {
      setValue(changedValue);
    }
  };
  useEffect(() => {
    const localData = localStorage.getItem('cartItems');
    const data = localData ? JSON.parse(localData) : [];
    dispatch(changeOrderQuantity(data.length));
  }, [dispatch]);
  return (
    <div>
      <div className="header-controls-pics">
        <div
          onClick={onClick}
          data-id="search-expander"
          className="header-controls-pic header-controls-search"
        ></div>
        <div
          onClick={() => {
            navigate('/cart');
          }}
          className="header-controls-pic header-controls-cart"
        >
          {orderQuantity != 0 && (
            <div className="header-controls-cart-full">{orderQuantity}</div>
          )}
          <div className="header-controls-cart-menu"></div>
        </div>
      </div>
      <form
        data-id="search-form"
        className={`header-controls-search-form form-inline ${visible ? '' : 'invisible'}`}
        onSubmit={onSubmit}
      >
        <input
          className="form-control"
          value={value}
          onChange={onChange}
          placeholder="Поиск"
        />
      </form>
    </div>
  );
}
