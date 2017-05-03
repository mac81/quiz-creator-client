import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux'
import {
  Route
} from 'react-router-dom';

// Actions
import * as QuizActions from 'actions/quizzes';
import * as QuestionActions from 'actions/questions';

// Selectors
import { SELECTORS } from 'reducers/quizzes';

import NodeSidebar from 'components/NodeSidebar';
import LinkButton from 'components/Linkbutton';
// Components
import Header from 'components/Header';


import Quiz from '../containers/Quiz';
import CreateQuestion from '../containers/CreateQuestion';
import EditQuestion from '../containers/EditQuestion';

export class Questionnaire extends React.Component {

  componentDidMount() {
    this.props.quizActions.loadQuiz(this.props.match.params.id);
  }

  render() {
    const { match, user } = this.props;
    console.log(user);
    if(!user.isLoggedIn){
      return (
        <Redirect to={{
          pathname: '/',
          state: { from: '/quizzes' }
        }}/>
      )
    }

    return (
      <div className="quiz-container">
        <Header />
        <NodeSidebar match={match} />
        <div className="node-details-container">
          <div className="node-details-view">
            <LinkButton
              label="Before"
              insertPosition="before"
            />
            <Route exact path="/:id" component={Quiz}/>
            <Route exact path="/:id/questions" component={CreateQuestion}/>
            <Route path="/:id/questions/:id" component={EditQuestion}/>
            <LinkButton
              label="After"
              insertPosition="after"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    quiz: SELECTORS.getQuiz(state),
    user: SELECTORS.getUser(state)
  }
};

const mapDispatchToProps = dispatch => ({
  quizActions: bindActionCreators(QuizActions, dispatch),
  questionActions: bindActionCreators(QuestionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);