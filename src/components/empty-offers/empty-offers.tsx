import Header from '../../components/header/header';
import CitiesList from '../cities-list/cities-list';
import { City } from '../../types/offer';
import { UserData } from '../../types/user-data';
import { AuthorizationStatus } from '../../const';

type EmptyOffersProps = {
  city: City;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

function EmptyOffers({city, authorizationStatus, user}: EmptyOffersProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header authorizationStatus={authorizationStatus} user={user}/>
      <main className="page__main page__main--index page__main--index-empty">
        {city && <CitiesList activeCity={city} />}
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmptyOffers;
