import {useAppDispatch, useAppSelector} from '../../../../hook/hook';
import {searchMoreCards} from '../../../../redux/slices/CardsSlice';
import {Loader} from '../../Loader/Loader';

export function SearchMore() {
  const {cards, search, moreLoading, moreEnd} = useAppSelector(
    (state) => state.cards,
  );
  const {currentCategoryId} = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  const onClick = () => {
    const urlParams = new URLSearchParams({
      offset: String(cards.length),
      categoryId: String(currentCategoryId),
    });
    if (search) {
      urlParams.set('q', search);
    }
    dispatch(searchMoreCards(urlParams.toString()));
  };
  return (
    <div className="text-center">
      {moreLoading && <Loader />}
      {!moreLoading && (
        <button
          onClick={onClick}
          className={`btn btn-outline-primary ${moreEnd && 'invisible'}`}
        >
          Загрузить ещё
        </button>
      )}
    </div>
  );
}
