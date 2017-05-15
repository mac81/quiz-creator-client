import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { SELECTORS } from 'reducers/user';

const AuthRoute = ({ component: Component, user, ...rest }) => (
  <Route {...rest} render={props => (
    user.isLoggedIn ? (
      <Component {...props}/>
    ) : (
      <div>Not authorized</div>

    )
  )}/>
);

const mapStateToProps = (state, props) => {
  return {
    user: SELECTORS.getUser(state)
  }
};

export default connect(mapStateToProps)(AuthRoute);

{/*<Redirect to={{*/}
{/*pathname: '/signin',*/}
{/*state: {from: props.location}*/}
{/*}}/>*/}