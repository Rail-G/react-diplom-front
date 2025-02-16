import {combineEpics} from 'redux-observable';
import {changeSearchEpic, searchCardsEpic} from './cardsEpic/cardsEpic';
import {getCategoriesEpic} from './categoriesEpic/categoriesEpic';
import {searchMoreEpic} from './searchMoreEpic/searchMoreEpic';
import {topSalesEpic} from './topSalesEpic/topSalesEpic';
import {cardItemEpic} from './cardItemEpic/cardItemEpic';
import {orderEpic} from './orderEpic/orderEpic';

export const combinedEpics = combineEpics(
  searchCardsEpic,
  getCategoriesEpic,
  changeSearchEpic,
  searchMoreEpic,
  topSalesEpic,
  cardItemEpic,
  orderEpic,
);
