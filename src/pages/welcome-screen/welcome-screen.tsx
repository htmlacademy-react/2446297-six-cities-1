import OffersList from '../../components/offers-list/offers-list';
import Header from '../../components/header/header';
import {Offer} from '../../types/offer';
import { useEffect, useState } from 'react';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { changeCity, setOffersList, setSortedOffersList } from '../../store/action';
import { CITIES } from '../../const';
import SortingOptions from '../../components/sorting-options/sorting-options';


function WelcomeScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offersList);
  const city = useAppSelector((state) => state.city);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const [sortingOption, setSortingOption] = useState('Popular');
  let sortedOffersList: Offer[] = offers;

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

  const cardHoverHandler = (offer: Offer) => {
    const {location} = offer;
    setActiveCard(location);
  };

  const points = offers.map((offerItem) => offerItem.location);

  const sortOptionChangeHandle = (option: string) => {
    setSortingOption(option);
    switch(option) {
      case 'Price: low to high':
        sortedOffersList = [...offers].sort((a: Offer, b: Offer) => a.price - b.price);
        break;
      case 'Price: high to low':
        sortedOffersList = [...offers].sort((a: Offer, b: Offer) => b.price - a.price);
        break;
      case 'Top rated first':
        sortedOffersList = [...offers].sort((a: Offer, b: Offer) => b.rating - a.rating);
        break;
      default:
        if (city) {
          dispatch(setOffersList(city));
        }
        break;
    }
    if (option !== 'Popular') {
      dispatch(setSortedOffersList(sortedOffersList));
    }
  };

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
              <OffersList offers={ offers } className={classes} onMouseOver={(offer) => cardHoverHandler(offer)}/>
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
