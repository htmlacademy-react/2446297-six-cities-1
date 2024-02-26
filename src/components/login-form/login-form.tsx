import { useRef, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';

function LoginForm(): JSX.Element {
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

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

  return (
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
  );
}

export default LoginForm;
