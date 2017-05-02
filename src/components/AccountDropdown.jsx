import React from 'react';
import {connect} from 'react-redux';
import { SELECTORS } from 'reducers/user';

class AccountDropdown extends React.Component {

  render() {

    const { user } = this.props;

    if(!user) {
      return (
        <button>Login</button>
      )
    }

    return (
      <div>
        {user && user.isLoggedIn ? (
          <div>{user.email} {user.firstName} {user.lastName}</div>
        ) : (
          <div>Logged out</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: SELECTORS.getUser(state)
  }
};

export default connect(mapStateToProps)(AccountDropdown);