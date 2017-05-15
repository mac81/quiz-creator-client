import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, Switch } from 'react-router-dom';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Store
import {store, history} from './store';

// Actions
import { Authenticate } from 'actions/users';

// Pages
import Home from 'containers/Home';
import SignIn from 'containers/Auth/SignIn';
import SignUp from 'containers/Auth/SignUp';
import ApplicationWrapper from 'containers/ApplicationWrapper';

const root = document.getElementById('app');

store.dispatch(Authenticate());

import './app.scss';

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider>
            <div>
              <Switch>
                <Route exact path="/" component={Home}/>

                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/signup" component={SignUp}/>

                <ApplicationWrapper/>

                <Route component={NoMatch}/>

              </Switch>
            </div>
          </MuiThemeProvider>

        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, root);
