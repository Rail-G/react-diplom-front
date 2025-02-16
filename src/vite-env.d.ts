/// <reference types="vite/client" />
/* eslint @typescript-eslint/no-explicit-any: 0 */

interface Card {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
}

interface CardItemSize {
  size: string;
  available: boolean;
}

interface CardItem {
  id: number;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  season: string;
  reason: string;
  sizes: CardItemSize[];
  price: number;
}

interface CardsState {
  error: null | string;
  loading: boolean;
  moreLoading: boolean;
  moreError: null | string;
  moreEnd: boolean;
  cards: Card[];
  params: string;
  search: string;
}

interface Categorie {
  id: number;
  title: string;
}

interface CategoriesState {
  categories: Categorie[];
  loading: boolean;
  error: null | string;
  currentCategoryId: number;
}

interface TopSalesState {
  cards: Card[];
  loading: boolean;
  error: null | string;
}

interface CardItemState {
  card: CardItem | null;
  loading: boolean;
  error: null | string;
  cardId: null | number;
}

interface OrderState {
  orderData: OrderData | null;
  loading: boolean;
  error: string | null;
  orderQuantity: number;
  serverResponse: boolean;
}

interface OrderUserInfo {
  phone: string;
  address: string;
}

interface OrderItems {
  id: number;
  price: number;
  count: number;
}

interface OrderData {
  owner: OrderUserInfo;
  items: OrderItems[];
}
