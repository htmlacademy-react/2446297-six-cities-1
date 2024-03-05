import Header from '../../components/header/header';
import { UserData } from '../../types/user-data';
import { AuthorizationStatus } from '../../const';

type EmptyFavoritesProps = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  error: boolean;
};

function EmptyFavorites({authorizationStatus, user, error}: EmptyFavoritesProps): JSX.Element {
  return (
    <div className="page page--favorites-empty">
      <Header authorizationStatus={authorizationStatus} user={user}/>

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              {error ? <b className="favorites__status">Error loading data</b> :
                <>
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </>}
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"></img>
        </a>
      </footer>
    </div>
  );
}

export default EmptyFavorites;
