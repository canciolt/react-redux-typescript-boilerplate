import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { ProtectedRouteProps } from 'interfaces/interfaces';
import { AppState } from 'store/types/types';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: AppState) => state.auth;

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const ProtectedRoute: React.FC<ProtectedRouteProps & Props> = props => {
  let redirectPath = '';
  let redirectParams = '';

  if (!props.loggedIn) {
    redirectPath = props.authenticationPath;
  }

  if (props.loggedIn && !props.isAllowed) {
    redirectPath = props.restrictedPath;
  }

  if (redirectPath) {
    if (props.location && props.location.pathname) {
      redirectParams = props.location.pathname;
    }
    const renderComponent = () => <Redirect to={{ pathname: redirectPath, search: `?redirect=${redirectParams}`}}/>;
    return <Route {...props} component={renderComponent} render={undefined}/>;
  } else {
    return <Route {...props} />;
  }
};

export default connector(ProtectedRoute);
