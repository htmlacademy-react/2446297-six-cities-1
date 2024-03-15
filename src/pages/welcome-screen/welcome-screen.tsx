import Header from '../../components/header/header';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { setOffersList } from '../../store/offers-data/offers-data';
import { changeCity } from '../../store/offers-process/offer-process';
import { CITIES } from '../../const';
import { fetchOffersAction } from '../../store/api-actions';
import CititesPlaces from '../../components/cities-places/citites-places';
import { getOffers, getErrorStatus } from '../../store/offers-data/selectors';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';
import { getCity } from '../../store/offers-process/selectors';
import EmptyOffers from '../../components/empty-offers/empty-offers';
import { City } from '../../types/offer';
import {resetIsDataLoadingParams, resetRoomErrors} from '../../store/offers-data/offers-data';

function WelcomeScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);
  const city = useAppSelector(getCity);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const hasError = useAppSelector(getErrorStatus);
  const [searchParams] = useSearchParams();

  useEffect(()=> {
    const selectedCity = searchParams.get('city');
    let chosenCity: City = CITIES[0];
    if (selectedCity) {
      chosenCity = CITIES.find((cityItem) => cityItem.name === selectedCity) || CITIES[0];
    }
    dispatch(changeCity({city: chosenCity}));
    dispatch(setOffersList({city: chosenCity}));
    dispatch(resetIsDataLoadingParams());
    dispatch(resetRoomErrors());
  }, []);

  useEffect(() => {
    if (city && offers.length === 0 && !hasError) {
      dispatch(fetchOffersAction());
    }
  }, [city, offers, dispatch]);

  if (hasError || offers.length === 0) {
    return <EmptyOffers city={city} error={hasError} authorizationStatus={authorizationStatus} user={user}/>;
  }

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
