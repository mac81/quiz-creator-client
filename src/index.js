import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Switch
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import {Provider} from 'react-redux';
import {store} from './store';
import {ConnectedRouter} from 'react-router-redux';
import {history} from './store';
import { loadQuestions } from './actions/questions';

// Pages
import Home from './containers/Home';
import QuizList from './containers/QuizList';

import Questionnaire from './containers/Questionnaire';

// Components
import Header from 'components/Header';




const root = document.getElementById('app');

//store.dispatch(loadQuestions());

import './app.scss';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider>
            <div>
              <Header />
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/quizzes" component={QuizList}/>

                <Route path="/:id" children={({match}) => (
                  <Questionnaire match={match} />
                )}/>

                {/*<Route path="/:id" component={Quiz}>*/}

                {/*<Route exact path="/:id/questions" render={() => (<div>123</div>)}/>*/}

                {/*</Route>*/}

                {/*<Route path="/questions" component={QuestionList}/>*/}
                {/*<Route path="/questions/:id" component={EditQuestion}/>*/}
              </Switch>
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, root);