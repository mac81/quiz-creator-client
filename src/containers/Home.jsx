import React from 'react';
import {connect} from 'react-redux';
import { SELECTORS } from 'reducers/user';

import { Redirect } from 'react-router-dom';
import SignIn from 'components/SignIn';

class Home extends React.Component {

  render() {

    const { user } = this.props;

    return (
      user.isLoggedIn ? (
        <Redirect to={{
          pathname: '/quizzes',
          state: { from: '/' }
        }}/>
      ) : (
        <SignIn/>
      )
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: SELECTORS.getUser(state)
  }
};

export default connect(mapStateToProps)(Home);
