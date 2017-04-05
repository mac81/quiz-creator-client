import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as QuestionActions from 'actions/questions';
import { SELECTORS } from 'reducers/questions'

export class EditQuestion extends React.Component {

  constructor(props) {
    super(props);

    this.props.actions.loadQuestion(props.match.params.id);
  }

  onChangeCorrectAnswer = (answerId) => {
    this.props.actions.updateQuestion('correctAnswerId', answerId)
  }

  onChangeAnswer = (answerId) => {
    this.props.actions.updateQuestion('answerText', 'Hello', answerId)
  }

  render() {
    const {question, answers} = this.props;

    if (!question) {
      return null
    }

    return (
      <div>
        <input defaultValue={question.questionText}/>

        <table>
          <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Answer</th>
            <th>Correct answer</th>
          </tr>
          </thead>
          <tbody>
          {answers.map((answer, index) => (
            <tr key={index}>
              <td>
                <button>Delete</button>
              </td>
              <td>
                <button>Move</button>
              </td>
              <td>
                <input defaultValue={answer.answerText} onChange={() => this.onChangeAnswer(answer._id)}/>
              </td>
              <td>
                <input
                  type="radio"
                  onChange={() => this.onChangeCorrectAnswer(answer._id)}
                  name="correctAnswer"
                  value={answer._id}
                  checked={answer._id === question.correctAnswerId}
                />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    question: SELECTORS.getQuestion(state),
    answers: SELECTORS.getAnswers(state)
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(QuestionActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion);