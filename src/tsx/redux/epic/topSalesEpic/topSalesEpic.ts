import {Epic, ofType} from 'redux-observable';
import {RootAction, RootState} from '../../store/store';
import {
  searchTopSales,
  searchTopSalesError,
  searchTopSalesSuccess,
} from '../../slices/topSalesSlice';
import {catchError, map, of, switchMap} from 'rxjs';
import {ajax} from 'rxjs/ajax';

export const topSalesEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
) =>
  action$.pipe(
    ofType(searchTopSales.type),
    switchMap(() =>
      ajax.getJSON(`${import.meta.env.VITE_MAIN_BACKEND_URL}/top-sales`).pipe(
        map((responseData) => searchTopSalesSuccess(responseData as Card[])),
        catchError((error) => of(searchTopSalesError(error.message))),
      ),
    ),
  );
