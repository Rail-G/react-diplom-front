import {Epic, ofType} from 'redux-observable';
import {
  searchCards,
  searchCardsError,
  searchCardsSuccess,
  changeSearch,
} from '../../slices/CardsSlice';
import {catchError, debounceTime, map, of, switchMap} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {RootAction, RootState} from '../../store/store';

export const searchCardsEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
) =>
  action$.pipe(
    ofType(searchCards.type),
    switchMap((action) =>
      ajax
        .getJSON(
          `${import.meta.env.VITE_MAIN_BACKEND_URL}/items${action.payload ? `?${action.payload}` : ''}`,
        )
        .pipe(
          map((responseData) => searchCardsSuccess(responseData as Card[])),
          catchError((error) => of(searchCardsError(error.message))),
        ),
    ),
  );

export const changeSearchEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
) =>
  action$.pipe(
    ofType(changeSearch.type),
    debounceTime(1000),
    map((action) =>
      searchCards(
        new URLSearchParams({
          q: action.payload.search,
          categoryId: action.payload.categoryId,
        }).toString(),
      ),
    ),
  );
