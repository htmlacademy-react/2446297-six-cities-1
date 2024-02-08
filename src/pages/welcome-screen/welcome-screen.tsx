import OffersList from '../../components/offers-list/offers-list';
import {Offer} from '../../types/offer';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import { useEffect, useState } from 'react';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { changeCity, getOffersList } from '../../store/action';
import { CITIES } from '../../const';

function WelcomeScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(changeCity(CITIES[0]));
    dispatch(getOffersList(CITIES[0]));
  }, []);

  const offers = useAppSelector((state) => state.offersList);
  const city = useAppSelector((state) => state.city);


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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
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
