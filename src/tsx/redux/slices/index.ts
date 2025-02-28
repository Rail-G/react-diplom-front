import { combineReducers } from "redux";
import cardsSlice from '../slices/CardsSlice';
import categoriesSlice from '../slices/CategoriesSlice';
import topSalesSlice from '../slices/topSalesSlice';
import cardItemSlice from '../slices/CardItemSlice';
import orderSlice from '../slices/OrderSlice';
import cartSlice from '../slices/CartSlice';

export const rootReducer = combineReducers({
    cards: cardsSlice,
    cardItem: cardItemSlice,
    categories: categoriesSlice,
    topSales: topSalesSlice,
    order: orderSlice,
    cart: cartSlice,
})