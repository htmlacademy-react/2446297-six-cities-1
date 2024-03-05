import { Navigate, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { AppRoute, AuthorizationStatus } from '../../const';
import LoginForm from '../../components/login-form/login-form';
import Header from '../../components/header/header';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { CITIES } from '../../const';

function LoginScreen(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={`/?city=${randomCity.name}`}>
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
