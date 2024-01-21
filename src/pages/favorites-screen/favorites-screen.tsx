import {Offers} from '../../types/offer';
import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';
import capitalizeFirstLetter from '../../helper-functions';

type FavoritesScreenProps = {
  offers: Offers;
}

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  function getUniqueCities(arr: Offers) {
    const result: string[] = [];
    for (const str of arr) {
      if (!result.includes(str.city.name)) {
        result.push(str.city.name);
      }
    }
    return result;
  }

  const uniqueCities = getUniqueCities(offers);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
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

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {uniqueCities.map((city, id) => {
                const keyValue = `${id}-${city}`;
                const filtredOffers = offers.filter((offer) => offer.city.name === city);
                return (
                  <li className="favorites__locations-items" key={keyValue}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {filtredOffers.map((offer, idOffer) => {
                        const keyOfferValue = `${idOffer}-${offer.previewImage}`;
                        const { isPremium, price, title, type, previewImage, rating } = offer;

                        return (
                          <article className="favorites__card place-card" key={keyOfferValue}>
                            {isPremium ?
                              <div className="place-card__mark">
                                <span>Premium</span>
                              </div>
                              : null}
                            <div className="favorites__image-wrapper place-card__image-wrapper">
                              <a href="#">
                                <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image" />
                              </a>
                            </div>
                            <div className="favorites__card-info place-card__info">
                              <div className="place-card__price-wrapper">
                                <div className="place-card__price">
                                  <b className="place-card__price-value">&euro;{price}</b>
                                  <span className="place-card__price-text">&#47;&nbsp;night</span>
                                </div>
                                <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                                  <svg className="place-card__bookmark-icon" width="18" height="19">
                                    <use xlinkHref="#icon-bookmark"></use>
                                  </svg>
                                  <span className="visually-hidden">In bookmarks</span>
                                </button>
                              </div>
                              <div className="place-card__rating rating">
                                <div className="place-card__stars rating__stars">
                                  <span style={{ width: `${rating * 20}%` }}></span>
                                  <span className="visually-hidden">Rating</span>
                                </div>
                              </div>
                              <h2 className="place-card__name">
                                <Link to={`/offer/${offer.id}`}>
                                  {title}
                                </Link>
                              </h2>
                              <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
