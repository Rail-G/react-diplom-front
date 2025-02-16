import {catchError, map, of, switchMap} from 'rxjs';
import {
  searchMoreCards,
  searchMoreCardsError,
  searchMoreCardsSuccess,
} from '../../slices/CardsSlice';
import {RootAction, RootState} from '../../store/store';
import {Epic, ofType} from 'redux-observable';
import {ajax} from 'rxjs/ajax';

export const searchMoreEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
) =>
  action$.pipe(
    ofType(searchMoreCards.type),
    switchMap((action) =>
      ajax
        .getJSON(
          `${import.meta.env.VITE_MAIN_BACKEND_URL}/items/?${action.payload}`,
        )
        .pipe(
          map((responseData) => searchMoreCardsSuccess(responseData as Card[])),
          catchError((error) => of(searchMoreCardsError(error.message))),
        ),
    ),
  );
