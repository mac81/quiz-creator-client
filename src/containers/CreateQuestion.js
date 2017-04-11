import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as QuestionActions from 'actions/questions';

import {TextField, Paper} from 'material-ui';

export class CreateQuestion extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      questionText: '',
      answers: [
        {
          _id: 1,
          answerText: ''
        },
        {
          _id: 2,
          answerText: ''
        }
      ]
    }
  }

  onChangeQuestionText = (e) => {
    this.setState({
      questionText: e.target.value
    })
  }

  onChangeAnswerText = (answerId) => {
    this.setState({
      answerText: e.target.value
    })
  }

  createQuestion = () => {
    this.props.actions.createQuestion(this.state.questionName)
  }

  render() {
    return (
      <div className="node-details-view">
        <Paper className="node-details-panel">
        <TextField
          onChange={this.onChangeQuestionText}
          name="questionText"
          floatingLabelText="Question"
          fullWidth={true}
        />

        <table>
          <thead>
          <tr>
            <th>Answer</th>
            <th>Correct answer</th>
          </tr>
          </thead>
          <tbody>
          {/*{this.state.answers.map(answer, index) => (*/}
            {/*<tr>*/}
              {/*<td>*/}
                {/*<input*/}
                  {/*name="answerText"*/}
                  {/*onChange={this.onUpdateAnswerText}*/}
                {/*/>*/}
              {/*</td>*/}
              {/*<td>*/}
                {/*<input*/}
                  {/*type="radio"*/}
                  {/*onChange={this.onUpdateCorrectAnswer}*/}
                  {/*name="correctAnswerId"*/}
                {/*/>*/}
              {/*</td>*/}
            {/*</tr>*/}
           {/*)}*/}
          </tbody>
        </table>

        <button onClick={this.createQuestion}>Create</button>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(QuestionActions, dispatch)
});

export default connect(undefined, mapDispatchToProps)(CreateQuestion);
