import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
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
import { loadQuestions } from './actions/questions';

// Pages
import Home from './containers/Home';
import QuizList from './containers/QuizList';
import Quiz from './containers/Quiz';
import QuestionList from './containers/QuestionList';
import CreateQuestion from './containers/CreateQuestion';
import EditQuestion from './containers/EditQuestion';

// Components
import Header from 'components/Header';
import NodeSidebar from 'components/NodeSidebar';
import LinkButton from 'components/Linkbutton';

import {RaisedButton} from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';

const root = document.getElementById('app');

store.dispatch(loadQuestions());

import './app.scss';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <MuiThemeProvider>
            <div>
              <Header />
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/quizzes" component={QuizList}/>

                <Route path="/:id" children={({match}) => (
                  <div className="quiz-container">
                    <NodeSidebar match={match} />
                    <div className="node-details-container">
                      <div className="node-details-view">
                        <RaisedButton
                          label="Before"
                          labelPosition="before"
                          secondary={true}
                          icon={<AddIcon/>}
                        />
                        <Route exact path="/:id" component={Quiz}/>
                        <Route exact path="/:id/questions" component={CreateQuestion}/>
                        <Route path="/:id/questions/:id" component={EditQuestion}/>
                        <LinkButton />
                      </div>
                    </div>
                  </div>
                )}/>

                {/*<Route path="/:id" component={Quiz}>*/}

                {/*<Route exact path="/:id/questions" render={() => (<div>123</div>)}/>*/}

                {/*</Route>*/}

                {/*<Route path="/questions" component={QuestionList}/>*/}
                {/*<Route path="/questions/:id" component={EditQuestion}/>*/}
              </Switch>
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, root);