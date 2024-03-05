import {Link, useLocation} from 'react-router-dom';
import { memo } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { UserData } from '../../types/user-data';
import { getFavoritePlaces } from '../../store/offers-data/selectors';

type HeaderProps = {
  authorizationStatus?: AuthorizationStatus;
  user?: UserData | null;
}

function HeaderBlock({authorizationStatus, user }: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const favoritePlaces = useAppSelector(getFavoritePlaces);
  const location = useLocation();

  return (
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

          {location.pathname !== AppRoute.Login &&
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.NoAuth &&
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>}

                {authorizationStatus === AuthorizationStatus.Auth &&
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage : user ? `url(${user.avatarUrl})` : '', borderRadius: '50%'}}></div>
                        <span className="header__user-name user__name">
                          {user && user.email}
                        </span>
                        <span className="header__favorite-count">{favoritePlaces.length}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <Link
                        className="header__nav-link"
                        onClick={(evt) => {
                          evt.preventDefault();
                          dispatch(logoutAction());
                        }}
                        to='/'
                      >
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>}
              </ul>
            </nav>}
        </div>
      </div>
    </header>
  );
}

const Header = memo(HeaderBlock);
export default Header;
