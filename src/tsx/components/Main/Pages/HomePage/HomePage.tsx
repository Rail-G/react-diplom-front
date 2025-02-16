import {Catalog} from '../../Catalog/Catalog';
import {TopSale} from '../../TopSale/TopSale';

export function HomePage() {
  return (
    <>
      <TopSale />
      <Catalog catalogPage={false} />
    </>
  );
}
