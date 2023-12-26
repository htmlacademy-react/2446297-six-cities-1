import {Link} from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray"
      style={{display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'}}
    >
      <div className="page__error404"
        style={{display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'}}
      >
        <h1 className=''>404 Not Found</h1>
        <Link to='/'
          style={{ padding: '20px 0',
            maxWidth: '200px',
            width: '100%',
            textAlign: 'center',
            transform: 'skew(-15deg)',
            color: '#FFFFFF',
            fontStyle: 'oblique',
            textShadow: '1px 0 0, 0.5px 0 0, -1px 0 0',
            textTransform: 'uppercase',
            backgroundColor: '#4481c3'}}
        >
          Back to main page
        </Link>
      </div>
    </div>
  );
}

export default NotFoundScreen;
