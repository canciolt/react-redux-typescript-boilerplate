import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from 'store/types/types';
import { ProtectedRouteProps } from 'interfaces/interfaces';
import ProtectedRoute from 'components/shared/PrivateComponent';
import UILogin from 'components/login/UILogin';
import UIContent from 'components/content/UIContent';
import UIUsers from 'components/admin/users/UIUsers';

const mapStateToProps = (state: AppState) => state.auth;

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

class App extends React.Component<Props, any> {

  protectedRouteProps: ProtectedRouteProps;

  constructor(props: Props) {
    super(props);
    this.protectedRouteProps = {
      authenticationPath: '/login',
      isAllowed: true,
      restrictedPath: '/',
    };
  }

  render() {
    return (
      <Switch>
        <Route exact path='/'>
          <UIContent/>
        </Route>
        <Route exact path='/login'>
          <UILogin/>
        </Route>
        <ProtectedRoute
          {...this.protectedRouteProps}
          exact={true}
          path='/users'
          component={UIUsers}
        />

      </Switch>
    );
  }
}

export default connector(App);
