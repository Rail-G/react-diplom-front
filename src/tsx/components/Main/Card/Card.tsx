import {Link} from 'react-router-dom';
import '../../../../style/Card.css';

export function Card({card}: {card: Card}) {
  return (
    <div>
      <div className="card catalog-item-card">
        <img
          src={card.images[0]}
          className="card-img-top img-fluid"
          alt={card.title}
        />
        <div className="card-body">
          <p className="card-text">{card.title}</p>
          <p className="card-text">{card.price} руб.</p>
          <Link to={`/catalog/${card.id}`} className="btn btn-outline-primary">
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
}
