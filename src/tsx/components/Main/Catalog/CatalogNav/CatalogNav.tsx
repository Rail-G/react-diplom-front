import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../hook/hook';
import {searchCards} from '../../../../redux/slices/CardsSlice';
import {
  changeCategory,
  searchCategories,
} from '../../../../redux/slices/CategoriesSlice';
import {Loader} from '../../Loader/Loader';
import {Error} from '../../Error/Error';
import {useEffect} from 'react';

export function CatalogNav() {
  const {categories, currentCategoryId, loading, error} = useAppSelector(
    (state) => state.categories,
  );
  const {search} = useAppSelector((state) => state.cards);
  const dispatch = useAppDispatch();
  const onClick = (id: number) => {
    if (currentCategoryId != id) {
      const urlParams = new URLSearchParams({categoryId: String(id)});
      if (search) {
        urlParams.set('q', search);
      }
      dispatch(searchCards(urlParams.toString()));
      dispatch(changeCategory(id));
    }
  };
  useEffect(() => {
    if (categories.length == 0) {
      dispatch(searchCategories());
    }
  }, [categories.length, dispatch]);
  const onErrorClick = () => {
    dispatch(searchCategories());
  };
  return (
    <>
      {loading && <Loader />}
      {error && <Error errorText={error} onClick={onErrorClick} />}
      {!loading && error == null && (
        <ul className="catalog-categories nav justify-content-center">
          <li className="nav-item">
            <Link
              className={`nav-link ${currentCategoryId == 0 && 'active'}`}
              onClick={() => onClick(0)}
              to="./"
            >
              Все
            </Link>
          </li>
          {categories.map((cat) => (
            <li className="nav-item" key={cat.id}>
              <Link
                className={`nav-link ${currentCategoryId == cat.id && 'active'}`}
                onClick={() => onClick(cat.id)}
                to="./"
              >
                {cat.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
