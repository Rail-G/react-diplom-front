import {ReactNode} from 'react';
import '../../../style/Main.css';
import {IMAGE} from '../../../img/image';

export function Main({children}: {children: ReactNode}): JSX.Element {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img
              src={IMAGE.banner}
              className="img-fluid"
              alt="К весне готовы!"
            />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
