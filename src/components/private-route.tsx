import {Navigate} from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
type PrivateRouteProps = {
  children: JSX.Element;
  authorizationStatus: AuthorizationStatus;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  return props.authorizationStatus === AuthorizationStatus.Auth ? props.children : <Navigate to={AppRoute.Login} />;
}

export default PrivateRoute;
