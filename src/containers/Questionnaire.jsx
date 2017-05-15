import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import { Switch, Link, Route } from 'react-router-dom';

// Actions
import * as QuizActions from 'actions/quizzes';
import * as QuestionActions from 'actions/questions';

// Selectors
import { SELECTORS } from 'reducers/quiz';

// Containers
import Overview from '../containers/Quiz/Overview';
import Builder from '../containers/Quiz/Builder';
import Deployment from '../containers/Quiz/Deployment';

export class Questionnaire extends React.Component {

  constructor(...args) {
    super(...args);

    this.props.quizActions.loadQuiz(this.props.match.params.id);
  }

  render() {
    const { match } = this.props;

    return (
      <div>
        <ul className="questionnaire-menu">
          <li>
            <Link to={`/${match.params.id}`}>Overview</Link>
          </li>
          <li>
            <Link to={`/${match.params.id}/questions`}>Builder</Link>
          </li>
          <li>
            <Link to={`/${match.params.id}/deployment`}>Deployment</Link>
          </li>
        </ul>
        <div className="quiz-container">
          <Switch>
            <Route exact path="/:id" component={Overview}/>
            <Route path="/:id/questions" component={Builder}/>
            <Route exact path="/:id/deployment" component={Deployment}/>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    quiz: SELECTORS.getQuiz(state)
  }
};

const mapDispatchToProps = dispatch => ({
  quizActions: bindActionCreators(QuizActions, dispatch),
  questionActions: bindActionCreators(QuestionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);