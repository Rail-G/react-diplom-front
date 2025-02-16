import {Loader} from '../Loader/Loader';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {searchCards} from '../../../redux/slices/CardsSlice';
import {CardList} from './CardList/CardList';
import {CatalogNav} from './CatalogNav/CatalogNav';
import {SearchMore} from './SearchMore/SearchMore';
import {useAppSelector} from '../../../hook/hook';
import {CatalogSearch} from './CatalogSearch/CatalogSearch';
import {changeCategory} from '../../../redux/slices/CategoriesSlice';
import {Error} from '../Error/Error';
import {EmptyCatalog} from '../EmptyCatalog/EmptyCatalog';

export function Catalog({catalogPage}: {catalogPage: boolean}) {
  const {cards, loading, search, error} = useAppSelector(
    (state) => state.cards,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (search.trim()) {
      const urlParams = new URLSearchParams({q: search});
      dispatch(searchCards(urlParams.toString()));
    } else {
      dispatch(searchCards(''));
    }
    dispatch(changeCategory(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const onErrorClick = () => {
    dispatch(searchCards(''));
  };
  return (
    <>
      <section className="catalog">
        <h2 className="text-center">Каталог</h2>
        {catalogPage && <CatalogSearch />}
        <CatalogNav />
        {loading && <Loader />}
        {error && <Error errorText={error} onClick={onErrorClick} />}
        {!loading && error == null && cards.length > 0 && (
          <>
            <CardList itemsList={cards} />
            <SearchMore />
          </>
        )}
        {!loading && error == null && cards.length == 0 && <EmptyCatalog />}
      </section>
    </>
  );
}
