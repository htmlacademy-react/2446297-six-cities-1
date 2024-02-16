import { Link, Navigate } from 'react-router-dom';
import { useRef, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { AppRoute, AuthorizationStatus } from '../../const';

function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (loginRef.current !== null && passwordRef.current !== null) {
      if (passwordRegex.test(passwordRef.current.value)) {
        setIsPasswordValid(true);
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        });
      }
      else {
        setIsPasswordValid(false);
      }
    }
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const target = evt.target;
    const value = target.value.trim().replace(/ +/g, ' ');
    if (passwordRef.current) {
      passwordRef.current.value = value;
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" ref={loginRef} id='email' required />
              </div>
              <div className="login__input-wrapper form__input-wrapper" style={{
                position: 'relative'}}
              >
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input"
                  style={{ border: isPasswordValid ? '1px solid #e6e6e6' : '1px solid red' }}
                  type="password"
                  name="password"
                  placeholder="Password"
                  ref={passwordRef}
                  id='password'
                  //value={passwordRef.current?.value}
                  onChange={handleInputChange}
                  required
                />
                {!isPasswordValid &&
                  <span style={{
                    position: 'absolute',
                    color: 'red',
                    display: 'block',
                    fontSize: '12px',
                    bottom: '5px'}}
                  className="form__error"
                  >Password must contain at least one letter and one digit
                  </span>}
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
