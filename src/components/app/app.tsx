import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute } from '../../const';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route';
import { useAppSelector } from '../../hooks/use-app-selector';
import Spinner from '../spinner/spinner';
import {getAuthorizationStatus, getAuthCheckedStatus} from '../../store/user-process/selectors';
import { getOffersDataLoadingStatus, getFavoritePlaces } from '../../store/offers-data/selectors';
import { fetchFavoritePlacesAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { AuthorizationStatus } from '../../const';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const favoritePlaces = useAppSelector(getFavoritePlaces);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!favoritePlaces.length) {
      if (authorizationStatus === AuthorizationStatus.Auth) {
        dispatch(fetchFavoritePlacesAction());
      }
    }
  }, [authorizationStatus, favoritePlaces.length, dispatch]);

  if (!isAuthChecked || isOffersDataLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<WelcomeScreen />}
        />
        <Route path={AppRoute.Login} element={<LoginScreen />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Room} element={<OfferScreen />}/>
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
