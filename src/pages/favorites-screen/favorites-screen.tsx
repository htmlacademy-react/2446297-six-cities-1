import {Offer} from '../../types/offer';
import OffersList from '../../components/offers-list/offers-list';
import Header from '../../components/header/header';
import {useAppSelector} from '../../hooks/useAppSelector';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';

type FavoritesScreenProps = {
  offers: Offer[];
}

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  function getUniqueCities(arr: Offer[]) {
    const result: Set<string> = new Set();
    for (const str of arr) {
      result.add(str.city.name);
    }
    return result;
  }

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const uniqueCities = getUniqueCities(offers);

  const classes = {
    article: 'favorites__card',
    img: 'favorites__image-wrapper',
    info: 'favorites__card-info',
    imgHeight: '150',
    imgWidth: '110',
    isPremiumBlockShow: false
  };

  return (
    <div className="page">
      <Header authorizationStatus={authorizationStatus} user={user}/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Array.from(uniqueCities).map((city, id) => {
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
                      <OffersList offers={ filtredOffers } className={classes} />
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
