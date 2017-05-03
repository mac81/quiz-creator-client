import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Store
import {store, history} from './store';

// Actions
import { getUserInfo } from 'actions/users';

// Pages
import Home from 'containers/Home';
import Signin from 'containers/Auth/Signin';
import QuizList from 'containers/QuizList';
import Questionnaire from 'containers/Questionnaire';

const root = document.getElementById('app');

//store.dispatch(getUserInfo());

import './app.scss';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider>
            <div>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/signin" component={Signin}/>
                <Route exact path="/signup" component={Signin}/>
                <Route exact path="/quizzes" component={QuizList}/>

                <Route path="/:id" children={({match}) => (
                  <Questionnaire match={match} />
                )}/>
              </Switch>
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, root);
