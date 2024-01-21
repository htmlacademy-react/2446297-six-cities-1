import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route';
import { Offers, Feedbacks } from '../../types/offer';

type AppScreenProps = {
  offersCount: number;
  offers: Offers;
  feedbacks: Feedbacks;
};

function App({ offersCount, offers, feedbacks }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<WelcomeScreen offersCount={offersCount} offers={offers} />}
        />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute hasAccess={false}>
              <FavoritesScreen offers={offers}/>
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Room} element={<OfferScreen offers={offers} feedbacks={feedbacks}/>}/>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
