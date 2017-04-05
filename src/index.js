import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { store, history } from './store';
import { ConnectedRouter } from 'react-router-redux';
//import { loadQuestions } from './actions/questions';

import QuestionList from './containers/QuestionList';
import CreateQuestion from './containers/CreateQuestion';
import EditQuestion from './containers/EditQuestion';

const root = document.getElementById('app');

//store.dispatch(loadQuestions());

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" component={QuestionList}/>
                        <Route path="/questions/new" component={CreateQuestion}/>
                        <Route path="/questions/:id" component={EditQuestion}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<App/>, root);