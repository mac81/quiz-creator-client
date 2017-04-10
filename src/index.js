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

import { Provider } from 'react-redux';
import { store, history } from './store';
import { ConnectedRouter } from 'react-router-redux';
//import { loadQuestions } from './actions/questions';

// Pages
import Home from './containers/Home';
import QuestionList from './containers/QuestionList';
import CreateQuestion from './containers/CreateQuestion';
import EditQuestion from './containers/EditQuestion';

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
                                <Route exact path="/questions" component={QuestionList}/>
                                <Route path="/questions/new" component={CreateQuestion}/>
                                <Route path="/questions/:id" component={EditQuestion}/>
                            </Switch>
                        </div>
                    </MuiThemeProvider>
                </ConnectedRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<App/>, root);