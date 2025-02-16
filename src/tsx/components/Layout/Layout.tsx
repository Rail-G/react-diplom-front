import {Outlet} from 'react-router-dom';
import {Header} from '../Header/Header';
import {Footer} from '../Footer/Footer';
import {Main} from '../Main/Main';

export function Layout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}
