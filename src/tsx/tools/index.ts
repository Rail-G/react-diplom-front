import {CartFinallyOrder} from '../components/Main/Pages/CardItemPage/CardItemTools/CardItemTools';

export const getLocalStorageItem = () => {
  const orders = localStorage.getItem('cartItems');
  const hasOrders: CartFinallyOrder[] = orders ? JSON.parse(orders) : [];
  return hasOrders;
};

