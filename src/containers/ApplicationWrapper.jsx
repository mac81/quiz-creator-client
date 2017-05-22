import React from 'react';
import {connect} from 'react-redux';
import { SELECTORS } from 'reducers/user';
import { Switch, Route } from 'react-router-dom';

import AuthRoute from 'containers/Auth/AuthRoute';
import QuizList from 'containers/Quiz/QuizList/QuizList';
import NewQuiz from 'containers/Quiz/NewQuiz';
import Questionnaire from 'containers/Questionnaire';

// Components
import Header from 'components/Header';

class ApplicationWrapper extends React.Component {

  render() {

    const {user} = this.props;

    return (
        <div>
          <Header/>
          <Switch>
            <AuthRoute exact path="/quizzes" component={QuizList}/>
            <AuthRoute exact path="/new-quiz" component={NewQuiz}/>
            <AuthRoute path="/:id" component={Questionnaire}/>
          </Switch>
        </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    user: SELECTORS.getUser(state)
  }
};


export default connect(mapStateToProps)(ApplicationWrapper);
