import {configureStore} from '@reduxjs/toolkit';
import {createEpicMiddleware} from 'redux-observable';
import {cardsAction} from '../slices/CardsSlice';
import {categoriesAction} from '../slices/CategoriesSlice';
import {topSalesAction} from '../slices/topSalesSlice';
import {cardItemAction} from '../slices/CardItemSlice';
import {orderAction} from '../slices/OrderSlice';
import {combinedEpics} from '../epic';
import { rootReducer } from '../slices';
import { persistReducer, persistStore } from 'redux-persist';
import { persistConfig } from '../persist';
import { cartAction } from '../slices/CartSlice';

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState
>();

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: {
      ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
    }}).concat(epicMiddleware),
});

export const persistedStore = persistStore(store)

epicMiddleware.run(combinedEpics);

export type AppDispatch = typeof store.dispatch;
export type RootAction =
  | cardsAction
  | categoriesAction
  | topSalesAction
  | cardItemAction
  | orderAction
  | cartAction;
export type RootState = {
  cards: CardsState;
  categories: CategoriesState;
  topSales: TopSalesState;
  cardItem: CardItemState;
  order: OrderState;
  cart: CartState;
};
