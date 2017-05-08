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

export class SignIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      enableSignin: false
    }
  }

  onChange = (e, value) => {
    this.setState({
      [e.target.name]: value
    })
  }

  enableSigin = () => {
    this.setState({
      enableSignin: true
    })
  }

  disableSigin = () => {
    this.setState({
      enableSignin: false
    })
  }

  signin = () => {
    const { username, password } = this.state;

    this.props.actions.signin(username, password);
  }

  render() {
    return (
      <Paper className="signin-container">
        <Formsy.Form
          onValidSubmit={this.signin}
          onValid={this.enableSigin}
          onInvalid={this.disableSigin}
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

          <RaisedButton
            type="submit"
            label="Submit"
            className="signin"
            primary={true}
            disabled={!this.state.enableSignin}
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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);