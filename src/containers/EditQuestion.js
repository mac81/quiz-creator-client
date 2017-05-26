import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as QuestionActions from 'actions/questions';
import * as AnswerActions from 'actions/answers';
import { SELECTORS as QUESTION_SELECTORS } from 'reducers/question';
import { SELECTORS as ANSWER_SELECTORS } from 'reducers/answers';
import DebounceInput from 'react-debounce-input';

import {TextField, Paper} from 'material-ui';

import LabelIcon from 'material-ui/svg-icons/action/label-outline';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

import AnswerList from 'components/AnswerList';

export class EditQuestion extends React.Component {

  constructor(props) {

    super(props);

    this.props.actions.loadQuestion(props.match.params.id, props.match.params.question_id);
    this.props.answerActions.loadAnswers(props.match.params.id, props.match.params.question_id);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.question_id !== nextProps.match.params.question_id) {
      this.props.actions.loadQuestion(this.props.match.params.id, nextProps.match.params.question_id);
    }
  }

  onUpdateQuestion = (e) => {
    this.props.actions.updateQuestion(e.target.name, e.target.value);
  }

  onDeleteQuestion = () => {
    this.props.actions.deleteQuestion(this.props.question._id);
  }

  onAddAnswer = () => {
    this.props.answerActions.createAnswer(this.props.match.params.id, this.props.match.params.question_id);
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
            <DebounceInput
                minLength={2}
                debounceTimeout={300}
                value={question.questionText}
                name="questionText"
                onChange={this.onUpdateQuestion}
            />

            <AnswerList match={this.props.match}/>

            <button onClick={this.onAddAnswer}>Add answer</button>
          </div>
        </Paper>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    question: QUESTION_SELECTORS.getQuestion(state)
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(QuestionActions, dispatch),
  answerActions: bindActionCreators(AnswerActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion);
