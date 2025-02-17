import {Card} from '../../Card/Card';

interface CardList {
  itemsList: Card[];
}

export function CardList({itemsList}: CardList) {
  return (
    <div>
      <ul className='row'>
      {itemsList.map((item) => (
        <li key={item.id} className='col-4'><Card card={item} /></li>
      ))}
      </ul>
    </div>
  );
}
