import {Link} from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { UserData } from '../../types/user-data';

type HeaderProps = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
}

function Header({authorizationStatus, user }: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
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
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.NoAuth &&
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </a>
                  </li>}

              {authorizationStatus === AuthorizationStatus.Auth &&
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage : user ? `url(${user.avatarUrl})` : '', borderRadius: '50%'}}></div>
                        <span className="header__user-name user__name">
                          {user && user.email}
                        </span>
                        <span className="header__favorite-count">3</span>
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
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
