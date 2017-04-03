import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadQuestions } from './actions/questions';

import QuestionList from './containers/QuestionList';
import CreateQuestion from './containers/CreateQuestion';
import EditQuestion from './containers/EditQuestion';

//store.dispatch(loadQuestions());

const root = document.getElementById('app');

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={QuestionList}/>
                        <Route path="/questions/new" component={CreateQuestion}/>
                        <Route path="/questions/:id" component={EditQuestion}/>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<App/>, root);