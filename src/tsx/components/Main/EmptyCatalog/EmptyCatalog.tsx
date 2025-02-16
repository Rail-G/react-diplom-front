import {useEffect, useState} from 'react';
import {useAppSelector} from '../../../hook/hook';

export function EmptyCatalog() {
  const {search} = useAppSelector((state) => state.cards);
  const [value, setValue] = useState<string>();
  useEffect(() => {
    setValue(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="top-sales text-center">
      <h2>
        К сожалению обувь <i>"{value}"</i> не найден
      </h2>
      <div className="background-image empty-catalog-img"></div>
    </section>
  );
}
