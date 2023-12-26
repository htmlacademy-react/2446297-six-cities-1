import {Navigate} from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
  hasAccess: boolean;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  return props.hasAccess ? props.children : <Navigate to={'/login'} />;
}

export default PrivateRoute;
