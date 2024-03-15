import {Link} from 'react-router-dom';
import './not-found-screen.css';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray page--error">
      <div className="page__error404">
        <h1>404 Not Found</h1>
        <Link className="page__error404-link" to='/'>
          Back to main page
        </Link>
      </div>
    </div>
  );
}

export default NotFoundScreen;
