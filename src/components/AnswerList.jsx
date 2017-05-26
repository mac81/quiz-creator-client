import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as QuestionActions from 'actions/questions';
import * as AnswerActions from 'actions/answers';
import { SELECTORS as QUESTION_SELECTORS } from 'reducers/question';
import { SELECTORS as ANSWER_SELECTORS } from 'reducers/answers';

import DebounceInput from 'react-debounce-input';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

class AnswerList extends React.Component {

  constructor(props) {
    super(props);
  }

  onUpdateQuestion = (e) => {
    this.props.questionActions.updateQuestion(e.target.name, e.target.value);
  }

  onUpdateAnswer = (e) => {
    const key = e.target.name;
    const answerId = e.target.getAttribute('data-answerId');
    const value = e.target.value;

    this.props.answerActions.updateAnswer(this.props.match, key, value, answerId)
  }

  onDeleteAnswer = (answerId) => {
    this.props.answerActions.deleteAnswer(this.props.match, answerId);
  }

  render() {

    const {question, answers} = this.props;

    return (
      <table>
        <thead>
        <tr>
          <th></th>
          <th>Answer</th>
          <th>Correct answer</th>
        </tr>
        </thead>
        <tbody>
        {answers && answers.map((answer, index) => (
          <tr key={index}>
            <td>
              <DeleteIcon onClick={(e) => this.onDeleteAnswer(answer._id)} color="#000">Delete</DeleteIcon>
            </td>
            <td>
              {/*<DebounceInput*/}
                {/*minLength={0}*/}
                {/*debounceTimeout={300}*/}
                {/*value={answer.answerText}*/}
                {/*data-answerId={answer._id}*/}
                {/*name="answerText"*/}
                {/*onChange={this.onUpdateAnswer}*/}
              {/*/>*/}
              <input
                defaultValue={answer.answerText}
                data-answerId={answer._id}
                name="answerText"
                onChange={this.onUpdateAnswer}
              />
            </td>
            <td>
              <input
                type="radio"
                onChange={this.onUpdateQuestion}
                name="correctAnswer"
                value={answer._id}
                checked={question.correctAnswer === answer._id}
              />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    question: QUESTION_SELECTORS.getQuestion(state),
    answers: ANSWER_SELECTORS.getAnswers(state)
  }
};

const mapDispatchToProps = dispatch => ({
  questionActions: bindActionCreators(QuestionActions, dispatch),
  answerActions: bindActionCreators(AnswerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerList);