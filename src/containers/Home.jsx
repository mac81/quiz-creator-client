import React from 'react';
import {connect} from 'react-redux';
import { SELECTORS } from 'reducers/user';

import { Redirect } from 'react-router-dom';
import SignIn from 'components/SignIn';
import SignUp from 'components/SignUp';

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
        <div>
          <SignIn/>
          {/*<SignUp/>*/}
        </div>
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
