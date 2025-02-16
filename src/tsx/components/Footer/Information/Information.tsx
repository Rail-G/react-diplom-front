import {NavLink} from 'react-router-dom';

export function Information() {
  return (
    <div className="col">
      <section>
        <h5>Информация</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">
              О магазине
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/catalog" className="nav-link">
              Каталог
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contacts" className="nav-link">
              Контакты
            </NavLink>
          </li>
        </ul>
      </section>
    </div>
  );
}
