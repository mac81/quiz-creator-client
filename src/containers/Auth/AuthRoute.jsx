import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { SELECTORS } from 'reducers/user';
import {bindActionCreators} from 'redux'
import * as UserActions from 'actions/users';

const AuthRoute = ({ component: Component, user, actions, isAuthenticating, ...rest }) => {

  if(!user.isAuthenticated && !user.isAuthenticating && !user.authorizationFailed) {
    actions.authenticate();
  }


  if(isAuthenticating) {
    return (
      <div>Spinner</div>
    )
  }

  return (
    <Route {...rest} render={props => (
      user.isAuthenticated ? (
        <Component {...props}/>
      ) : (
        <div>Not authorized</div>
      )
    )}/>
  );
}

const mapStateToProps = (state, props) => {
  return {
    user: SELECTORS.getUser(state),
    isAuthenticating: SELECTORS.getIsAuthenticating(state)
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);

