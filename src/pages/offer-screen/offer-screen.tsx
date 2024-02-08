import { useParams, Link, Navigate } from 'react-router-dom';
import { Offer, Feedback } from '../../types/offer';
import { AppRoute } from '../../const';
import capitalizeFirstLetter from '../../helper-functions';
import Feedbacks from '../../components/feedbacks/feedbacks';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';

type OfferScreenProps = {
  offers: Offer[];
  feedbacks: Feedback[];
}

function OfferScreen({offers, feedbacks}: OfferScreenProps): JSX.Element {
  const classes = {
    article: 'near-places__card',
    img: 'near-places__image-wrapper',
    info: '',
    isPremiumBlockShow: false
  };

  const { id } = useParams();
  if (!id) {
    return <Navigate to="/404" replace />;
  }

  const offer = offers.find((item) => item.id === +id);
  if (!offer) {
    return <Navigate to="/404" replace />;
  }

  const nearestRooms = offers.filter((room) => room.id !== +id);
  const nearestPoints = offers.map((offerItem) => offerItem.location);
  const { bedrooms, goods, host, images, description, isPremium, maxAdults, price, rating, title, type, city, location} = offer;

  return (
    <div className="page">
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

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((img, index) => {
                const keyValue = `${index}-${img}`;
                return (
                  <div className="offer__image-wrapper" key={keyValue}>
                    <img
                      className="offer__image"
                      src={img}
                      alt="Photo studio"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
                : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeFirstLetter(type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                      Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good, index) => {
                    const keyValue = `${index}-${good}`;
                    return (
                      <li className="offer__inside-item" key={keyValue}>{good}</li>
                    );
                  })}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro ?
                    <span className="offer__user-status">Pro</span>
                    : null}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <Feedbacks feedbacks={feedbacks}/>
            </div>
          </div>
          <Map city={city}
            points={nearestPoints}
            selectedPoint={location}
            className="offer__map"
            mapHeight='579px'
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
                  Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList offers={ nearestRooms.slice(0, 3) } className={classes}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
