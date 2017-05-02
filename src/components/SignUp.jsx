import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as UserActions from 'actions/users';
import { SELECTORS } from 'reducers/user';

// Material Components
import { FormsyText } from 'formsy-material-ui/lib';
import {RaisedButton, Paper} from 'material-ui';

const errorMessages = {
  minLength: 'Username must be at least 5 characters long'
}

export class SignUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      enableSignup: false
    }
  }

  onChange = (e, value) => {
    this.setState({
      [e.target.name]: value
    })
  }

  enableSigup = () => {
    this.setState({
      enableSignup: true
    })
  }

  disableSignup = () => {
    this.setState({
      enableSignup: false
    })
  }

  signup = () => {
    const { username, password, firstname, lastname } = this.state;

    this.props.actions.signup(username, password, firstname, lastname);
  }

  render() {
    return (
      <Paper className="signin-container">
        <Formsy.Form
          onValidSubmit={this.signup}
          onValid={this.enableSigup}
          onInvalid={this.disableSignup}
        >
          <FormsyText
            onChange={this.onChange}
            name="username"
            floatingLabelText="Username"
            fullWidth={true}
            required
            validations={{
              minLength: 5
            }}
            validationErrors={{
              minLength: 'Username must be at least 5 characters long'
            }}
          />
          <FormsyText
            onChange={this.onChange}
            name="password"
            floatingLabelText="Password"
            fullWidth={true}
            required
            validations={{
              minLength: 8
            }}
            validationErrors={{
              minLength: 'Password must be at least 8 characters long'
            }}
          />

          <FormsyText
            onChange={this.onChange}
            name="firstname"
            floatingLabelText="First name"
            fullWidth={true}
            required
          />

          <FormsyText
            onChange={this.onChange}
            name="lastname"
            floatingLabelText="Last name"
            fullWidth={true}
            required
          />

          <RaisedButton
            type="submit"
            label="Submit"
            className="signin"
            primary={true}
            disabled={!this.state.enableSignup}
          />
        </Formsy.Form>
      </Paper>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    router: state.router,
    user: SELECTORS.getUser(state)
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UserActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);