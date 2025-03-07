import {BrowserRouter as BRouter, Routes, Route} from 'react-router-dom';
import {Layout} from '../Layout/Layout';
import {Page404} from '../Main/Pages/Page404/Page404';
import {HomePage} from '../Main/Pages/HomePage/HomePage';
import {CatalogPage} from '../Main/Pages/CatalogPage/CatalogPage';
import {AboutPage} from '../Main/Pages/AboutPage/AboutPage';
import {ContactPage} from '../Main/Pages/ContactPage/ContactPage';
import {CartPage} from '../Main/Pages/CartPage/CartPage';
import {CardItemPage} from '../Main/Pages/CardItemPage/CardItemPage';
import {Provider} from 'react-redux';
import {store, persistedStore} from '../../redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';

export function Router() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <BRouter basename={import.meta.env.VITE_BASENAME}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="catalog" element={<CatalogPage />} />
              <Route path="catalog/:id" element={<CardItemPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contacts" element={<ContactPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </BRouter>
      </PersistGate>
    </Provider>
  );
}
