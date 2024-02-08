import OffersList from '../../components/offers-list/offers-list';
import {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { useEffect, useState } from 'react';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { changeCity, getOffersList, sortOffersList } from '../../store/action';
import { CITIES } from '../../const';
import SortingOptions from '../../components/sorting-options/sorting-options';

function WelcomeScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offersList);
  const city = useAppSelector((state) => state.city);
  const [sortingOption, setSortingOption] = useState('Popular');
  let sortedOffersList: Offer[] = offers;

  useEffect(()=> {
    dispatch(changeCity(CITIES[0]));
    dispatch(getOffersList(CITIES[0]));
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

  const hoverCardHandle = (offer: Offer) => {
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
          dispatch(getOffersList(city));
        }
        break;
    }
    if (option !== 'Popular') {
      dispatch(sortOffersList(sortedOffersList));
    }
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        {city && <CitiesList activeCity={city} />}
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city && city.name}</b>
              <SortingOptions
                sortingOption = {sortingOption}
                onOptionChange={sortOptionChangeHandle}
              />
              <OffersList offers={ offers } className={classes} onMouseOver={(offer) => hoverCardHandle(offer)}/>
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
