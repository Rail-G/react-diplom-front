import {RootAction, RootState} from '../../store/store';
import {Epic, ofType} from 'redux-observable';
import {catchError, map, of, switchMap} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {
  searchCategories,
  searchCategoriesError,
  searchCategoriesSuccess,
} from '../../slices/CategoriesSlice';

export const getCategoriesEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
) =>
  action$.pipe(
    ofType(searchCategories.type),
    switchMap(() =>
      ajax.getJSON(`${import.meta.env.VITE_MAIN_BACKEND_URL}/categories`).pipe(
        map((responseData) =>
          searchCategoriesSuccess(responseData as Categorie[]),
        ),
        catchError((error) => of(searchCategoriesError(error.message))),
      ),
    ),
  );
