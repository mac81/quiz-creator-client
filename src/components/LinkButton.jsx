import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as QuestionActions from 'actions/questions';
import { SELECTORS as SELECTORS_QUESTION } from 'reducers/question';
import { SELECTORS as SELECTORS_QUESTIONS } from 'reducers/questions';

import {RaisedButton} from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';


export class LinkButton extends React.Component {
  render() {
    const { label, insertPosition, question, questions } = this.props;
    const index = questions && question && questions.findIndex(q => q._id === question._id);

    return (
      <RaisedButton
        label={label}
        labelPosition="before"
        secondary={true}
        onClick={() => {
          this.props.actions.createQuestion('', insertPosition, index);
        }}
        icon={<AddIcon/>}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    question: SELECTORS_QUESTION.getQuestion(state),
    questions: SELECTORS_QUESTIONS.getQuestions(state)
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(QuestionActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkButton);