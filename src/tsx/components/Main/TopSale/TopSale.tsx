import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hook/hook';
import {CardList} from '../Catalog/CardList/CardList';
import {Loader} from '../Loader/Loader';
import {searchTopSales} from '../../../redux/slices/topSalesSlice';
import {Error} from '../Error/Error';

export function TopSale() {
  const {cards, loading, error} = useAppSelector((state) => state.topSales);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(searchTopSales());
  }, [dispatch]);
  const onErrorClick = () => dispatch(searchTopSales());
  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {loading && <Loader />}
      {error && <Error errorText={error} onClick={onErrorClick} />}
      {!loading && cards.length != 0 && <CardList itemsList={cards} />}
    </section>
  );
}
