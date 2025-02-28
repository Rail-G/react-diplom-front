import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../../hook/hook';
import { addCartItems, updateQuantityCartItem } from '../../../../../redux/slices/CartSlice';

interface CartOrderItem {
  id: number;
  title: string;
  price: number;
}

interface CartOrder {
  cardSizes: CardItemSize[];
  cartOrderItem: CartOrderItem;
}

export interface CartFinallyOrder {
  id: number;
  title: string;
  price: number;
  size: string;
  quantity: number;
}

export function CardItemTools({
  cardSizes,
  cartOrderItem,
}: CartOrder): JSX.Element {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {cartItems} = useAppSelector(state => state.cart)
  const onClickAdd = () => {
    setQuantity((prev) => Math.min(prev + 1, 10));
  };
  const onClickSubtract = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };
  const onClickToSize = (size: string) => setSelectedSize(size);
  const onClickToSendToCart = () => {
    const cartItem = {
      size: selectedSize as string,
      quantity: quantity,
    };
    const findedOrder = cartItems.find(
      (order) =>
        order.title == cartOrderItem.title && order.size == cartItem.size,
    );
    if (findedOrder) {
      dispatch(updateQuantityCartItem({id: findedOrder.id, quantity: quantity}))
    } else {
      const newCartItem = {...cartOrderItem, ...cartItem}
      dispatch(addCartItems(newCartItem));
    }
    navigate('/cart');
  };
  return (
    <>
      <div className="text-center">
        <p>
          Размеры в наличии:
          {cardSizes.map(
            (cardSize, index) =>
              cardSize.available && (
                <span
                  key={index}
                  className={`catalog-item-size ${selectedSize == cardSize.size && 'selected'}`}
                  onClick={() => onClickToSize(cardSize.size)}
                >
                  {cardSize.size}
                </span>
              ),
          )}
        </p>
        <p>
          Количество:{' '}
          <span className="btn-group btn-group-sm pl-2">
            <button onClick={onClickSubtract} className="btn btn-secondary">
              -
            </button>
            <span className="btn btn-outline-primary">{quantity}</span>
            <button onClick={onClickAdd} className="btn btn-secondary">
              +
            </button>
          </span>
        </p>
      </div>
      {selectedSize ? (
        <button
          onClick={onClickToSendToCart}
          className="btn btn-danger btn-block btn-lg"
        >
          В корзину
        </button>
      ) : (
        <p className="text-center">
          Пожалуйста выберите доступный размер обуви перед совершением покупки
        </p>
      )}
    </>
  );
}
