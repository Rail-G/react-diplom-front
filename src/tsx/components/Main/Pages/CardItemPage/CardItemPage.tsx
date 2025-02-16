import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../../hook/hook';
import {useEffect, useState} from 'react';
import {searchCardItem} from '../../../../redux/slices/CardItemSlice';
import {Loader} from '../../Loader/Loader';
import {CardItemTools} from './CardItemTools/CardItemTools';
import {Error} from '../../Error/Error';

export function CardItemPage() {
  const [availableSize, setAvailableSize] = useState<boolean>(true);
  const params = useParams();
  const {card, loading, error} = useAppSelector((state) => state.cardItem);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(searchCardItem(Number(params.id)));
  }, [dispatch, params.id]);
  useEffect(() => {
    if (card != null) {
      const notAvailable = card.sizes.filter((sizes) => !sizes.available);
      if (notAvailable.length == card.sizes.length) {
        setAvailableSize(false);
      }
    }
  }, [card]);
  const onErrorClick = () => dispatch(searchCardItem(Number(params.id)));
  return (
    <>
      {loading && <Loader />}
      {error && <Error errorText={error} onClick={onErrorClick} />}
      {!loading && card != null && error == null && (
        <section className="catalog-item">
          <h2 className="text-center">{card.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={card.images[0]} className="img-fluid" alt="" />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{card.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{card.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{card.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{card.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{card.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{card.reason}</td>
                  </tr>
                </tbody>
              </table>
              {availableSize ? (
                <CardItemTools
                  cardSizes={card.sizes}
                  cartOrderItem={{
                    title: card.title,
                    id: card.id,
                    price: card.price,
                  }}
                />
              ) : (
                <p className="text-center">
                  Не хотим вас огорчить, но такого размера нет в наличии
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
