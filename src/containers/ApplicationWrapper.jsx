import React from 'react';
import {connect} from 'react-redux';
import { SELECTORS } from 'reducers/user';
import { Route } from 'react-router-dom';

import AuthRoute from 'containers/Auth/AuthRoute';
import QuizList from 'containers/QuizList';
import NewQuiz from 'containers/Quiz/NewQuiz';
import Questionnaire from 'containers/Questionnaire';


class ApplicationWrapper extends React.Component {

  render() {

    const {user} = this.props;

    if(!user.isLoggedIn) {
      return (
        <div>Loading app</div>
      )
    }

    return (
        <div>
            <AuthRoute exact path="/quizzes" component={QuizList}/>
            <AuthRoute exact path="/new-quiz" component={NewQuiz}/>

            <Route path="/:id" children={({match}) => (
              <Questionnaire match={match} />
            )}/>
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

