import {configureStore} from '@reduxjs/toolkit';
import {createEpicMiddleware} from 'redux-observable';
import cardsSlice, {cardsAction} from '../slices/CardsSlice';
import categoriesSlice, {categoriesAction} from '../slices/CategoriesSlice';
import topSalesSlice, {topSalesAction} from '../slices/topSalesSlice';
import cardItemSlice, {cardItemAction} from '../slices/CardItemSlice';
import orderSlice, {orderAction} from '../slices/OrderSlice';
import {combinedEpics} from '../epic';

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();

export const store = configureStore({
  reducer: {
    cards: cardsSlice,
    cardItem: cardItemSlice,
    categories: categoriesSlice,
    topSales: topSalesSlice,
    order: orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(combinedEpics);

export type AppDispatch = typeof store.dispatch;
export type RootAction =
  | cardsAction
  | categoriesAction
  | topSalesAction
  | cardItemAction
  | orderAction;
export type RootState = {
  cards: CardsState;
  categories: CategoriesState;
  topSales: TopSalesState;
  cardItem: CardItemState;
  order: OrderState;
};
