import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UserActions from 'actions/users';
import { SELECTORS } from 'reducers/user';

class AccountDropdown extends React.Component {

  onSignOut = () => {
      this.props.actions.signOut();
  }

  render() {

    const { user } = this.props;

    if(!user) {
      return (
        <button>Login</button>
      )
    }

    return (
      <div>
        {user && user.isAuthenticated && (
          <div>
            <div>{user.email} {user.firstName} {user.lastName}</div>
            <button onClick={this.onSignOut}>Sign out</button>
          </div>
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

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDropdown);
