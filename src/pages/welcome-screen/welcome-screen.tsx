import Header from '../../components/header/header';
import { useEffect } from 'react';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setOffersList } from '../../store/offers-data/offers-data';
import { changeCity } from '../../store/offers-process/offer-process';
import { CITIES } from '../../const';
import { fetchOffersAction } from '../../store/api-actions';
import CititesPlaces from '../../components/cities-places/citites-places';
import { getOffers } from '../../store/offers-data/selectors';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';
import { getCity } from '../../store/offers-process/selectors';

function WelcomeScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);

  useEffect(()=> {
    dispatch(changeCity({city: CITIES[0]}));
    dispatch(setOffersList({city: CITIES[0]}));
  }, []);

  useEffect(() => {
    if (city && offers.length === 0) {
      dispatch(fetchOffersAction());
    }
  }, [city, offers, dispatch]);

  return (
    <div className="page page--gray page--main">
      <Header authorizationStatus={authorizationStatus} user={user}/>
      <main className="page__main page__main--index">
        {city && <CitiesList activeCity={city} />}
        {city && <CititesPlaces city={city} offers={offers}/>}
      </main>
    </div>
  );
}

export default WelcomeScreen;
