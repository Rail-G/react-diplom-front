import {Epic, ofType} from 'redux-observable';
import {RootAction, RootState} from '../../store/store';
import {
  searchCardItem,
  searchCardItemError,
  searchCardItemSuccess,
} from '../../slices/CardItemSlice';
import {catchError, map, of, switchMap} from 'rxjs';
import {ajax} from 'rxjs/ajax';

export const cardItemEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
) =>
  action$.pipe(
    ofType(searchCardItem.type),
    switchMap((action) =>
      ajax
        .getJSON(
          `${import.meta.env.VITE_MAIN_BACKEND_URL}/items/${action.payload}`,
        )
        .pipe(
          map((responseData) =>
            searchCardItemSuccess(responseData as CardItem),
          ),
          catchError((error) => of(searchCardItemError(error.message))),
        ),
    ),
  );
