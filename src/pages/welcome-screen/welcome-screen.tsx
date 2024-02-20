import OffersList from '../../components/offers-list/offers-list';
import Header from '../../components/header/header';
import {Offer} from '../../types/offer';
import { useEffect, useState, useCallback, useMemo } from 'react';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { changeCity, setOffersList } from '../../store/action';
import { CITIES } from '../../const';
import SortingOptions from '../../components/sorting-options/sorting-options';
import { fetchOffersAction } from '../../store/api-actions';
import { store } from '../../store';

store.dispatch(fetchOffersAction());

function WelcomeScreen(): JSX.Element {
  console.log('WelcomeScreen');
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offersList);
  const city = useAppSelector((state) => state.city);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const [sortingOption, setSortingOption] = useState('Popular');

  useEffect(()=> {
    dispatch(changeCity(CITIES[0]));
    dispatch(setOffersList(CITIES[0]));
  }, []);

  useEffect(() => {
    setSortingOption('Popular');
  }, [city]);

  const classes = {
    article: 'cities__card',
    img: 'cities__image-wrapper',
    info: ''
  };

  const [activeCard, setActiveCard] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 10,
  });

  const cardHoverHandler = useCallback((offer: Offer) => {
    const {location} = offer;
    setActiveCard(location);
  }, []);

  const points = offers.map((offerItem) => offerItem.location);

  const sortedOffersList = useMemo(() => {
    switch(sortingOption) {
      case 'Price: low to high':
        return [...offers].sort((a: Offer, b: Offer) => a.price - b.price);
      case 'Price: high to low':
        return [...offers].sort((a: Offer, b: Offer) => b.price - a.price);
      case 'Top rated first':
        return [...offers].sort((a: Offer, b: Offer) => b.rating - a.rating);
      default:
        return offers;
    }
  }, [sortingOption, offers]);

  const sortOptionChangeHandle = useCallback((option: string) => {
    setSortingOption(option);
  }, []);

  return (
    <div className="page page--gray page--main">
      <Header authorizationStatus={authorizationStatus} user={user}/>
      <main className="page__main page__main--index">
        {city && <CitiesList activeCity={city} />}
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city && city.name}</b>
              <SortingOptions
                city={city}
                sortingOption = {sortingOption}
                onOptionChange={sortOptionChangeHandle}
              />
              <OffersList offers={ sortedOffersList } className={classes} onMouseOver={cardHoverHandler}/>
            </section>
            <div className="cities__right-section">
              {city &&
                <Map city={city}
                  points={Array.from(points)}
                  selectedPoint={activeCard}
                  className="cities__map"
                />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomeScreen;
