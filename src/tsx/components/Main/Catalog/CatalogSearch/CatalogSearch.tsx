import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../../hook/hook';
import {changeSearch} from '../../../../redux/slices/CardsSlice';

export function CatalogSearch() {
  const {search} = useAppSelector((state) => state.cards);
  const {currentCategoryId} = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.trim() && search.trim()) {
      dispatch(
        changeSearch({search: '', categoryId: String(currentCategoryId)}),
      );
    }
    if (e.target.value.trim()) {
      dispatch(
        changeSearch({
          search: e.target.value,
          categoryId: String(currentCategoryId),
        }),
      );
    }
  };
  return (
    <form className="catalog-search-form form-inline">
      <input
        className="form-control"
        value={search || ''}
        onChange={onChange}
        placeholder="Поиск"
      />
    </form>
  );
}
