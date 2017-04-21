import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux'

// Actions
import * as QuizActions from 'actions/quizzes';
import * as QuestionActions from 'actions/questions';

// Selectors
import { SELECTORS } from 'reducers/quizzes';

import {RaisedButton, Paper} from 'material-ui';

export class Quiz extends React.Component {

  constructor(props) {
    super(props);

    //this.props.quizActions.loadQuiz(props.match.params.id);
  }

  onAddQuestion = (e) => {
    e.preventDefault();
    this.props.questionActions.createQuestion();
    // TODO: Redirect to created question
  }

  render() {
    const {quiz, match} = this.props;

    if (!quiz) {
      return null
    }

    return (
      <div className="node-details-view">
        <Paper className="node-details-panel">
            Details
            <Link to={`${match.url}/questions`} onClick={this.onAddQuestion}>Create new question</Link>
        </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);