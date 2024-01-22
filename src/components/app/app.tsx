import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
//import PrivateRoute from '../private-route';
import { Offer, Feedback } from '../../types/offer';

type AppScreenProps = {
  offers: Offer[];
  feedbacks: Feedback[];
};

function App({ offers, feedbacks }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<WelcomeScreen offers={offers} />}
        />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route
          path={AppRoute.Favorites}
          element={
            //<PrivateRoute hasAccess={false}>
            <FavoritesScreen offers={offers}/>
            //</PrivateRoute>
          }
        />
        <Route path={AppRoute.Room} element={<OfferScreen offers={offers} feedbacks={feedbacks}/>}/>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
