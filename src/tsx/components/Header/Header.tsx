import {NavLink} from 'react-router-dom';
import {MenuTools} from './MenuTools/MenuTools';
import {Navigator} from './Navigator/Navigator';
import {IMAGE} from '../../../img/image';

export function Header() {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
              <img src={IMAGE.headerLogo} alt="Bosa Noga" />
            </NavLink>
            <div className="collapase navbar-collapse" id="navbarMain">
              <Navigator />
              <MenuTools />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
