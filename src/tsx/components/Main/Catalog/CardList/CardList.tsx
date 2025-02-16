import {Card} from '../../Card/Card';

interface CardList {
  itemsList: Card[];
}

export function CardList({itemsList}: CardList) {
  return (
    <div className="row">
      {itemsList.map((item) => (
        <Card card={item} />
      ))}
    </div>
  );
}
