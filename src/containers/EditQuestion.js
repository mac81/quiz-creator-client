import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as QuestionActions from 'actions/questions';
import { SELECTORS } from 'reducers/questions'

import {TextField, Paper} from 'material-ui';

import LabelIcon from 'material-ui/svg-icons/action/label-outline';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

export class EditQuestion extends React.Component {

  constructor(props) {
    super(props);

    this.props.actions.loadQuestion(props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.id !== nextProps.match.params.id) {
      this.props.actions.loadQuestion(nextProps.match.params.id);
    }
  }

  onUpdateQuestion = (e) => {
    this.props.actions.updateQuestion(e.target.name, e.target.value)
  }

  onDeleteQuestion = () => {
    this.props.actions.deleteQuestion(this.props.question._id);
  }

  onUpdateAnswerText = (e, answerId) => {
    this.props.actions.updateQuestionAnswer('answerText', e.target.value, answerId)
  }

  onDeleteAnswer = (e) => {
    this.props.actions.deleteQuestionAnswer(e.target.value);
  }

  onAddAnswer = () => {
    this.props.actions.createAnswer();
  }

  render() {
    const {question, answers} = this.props;

    if (!question) {
      return null
    }

    return (

        <Paper className="qc-panel">
          <div className="cq-panel-header">
            <LabelIcon className="cq-icon" color="#fff"/>
            <h4 className="cq-question-label">{question.label}</h4>
            <DeleteIcon onClick={this.onDeleteQuestion} color="#fff">Delete</DeleteIcon>
          </div>
          <div className="cq-panel-body">
          <TextField
            onChange={this.onUpdateQuestion}
            value={question.questionText}
            name="questionText"
            floatingLabelText="Question"
            fullWidth={true}
          />
        {/*<input defaultValue={question.questionText} name="questionText" onChange={this.onUpdateQuestion}/>*/}

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
                <button onClick={this.onDeleteAnswer} value={answer._id}>Delete</button>
              </td>
              <td>
                <button>Move</button>
              </td>
              <td>
                <input
                  defaultValue={answer.answerText}
                  name="answerText"
                  onChange={(e) => this.onUpdateAnswerText(e, answer._id)}
                />
              </td>
              <td>
                <input
                  type="radio"
                  onChange={this.onUpdateQuestion}
                  name="correctAnswerId"
                  value={answer._id}
                  checked={answer._id === question.correctAnswerId}
                />
              </td>
            </tr>
          ))}
          </tbody>
        </table>
            <button onClick={this.onAddAnswer}>Add answer</button>
          </div>
        </Paper>
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