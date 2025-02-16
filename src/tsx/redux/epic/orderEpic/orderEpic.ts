import {Epic, ofType} from 'redux-observable';
import {RootAction, RootState} from '../../store/store';
import {
  sendOrderDataToServer,
  sendOrderDataToServerError,
  sendOrderDataToServerSuccess,
} from '../../slices/OrderSlice';
import {catchError, map, of, switchMap} from 'rxjs';
import {ajax} from 'rxjs/ajax';

export const orderEpic: Epic<RootAction, RootAction, RootState> = (action$) =>
  action$.pipe(
    ofType(sendOrderDataToServer.type),
    switchMap((action) =>
      ajax({
        url: `${import.meta.env.VITE_MAIN_BACKEND_URL}/order`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: action.payload,
      }).pipe(
        map(() => sendOrderDataToServerSuccess()),
        catchError((error) => of(sendOrderDataToServerError(error.message))),
      ),
    ),
  );
