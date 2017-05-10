import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import * as QuizActions from 'actions/quizzes';

class NewQuiz extends React.Component {

  constructor(...props) {
    super(...props);

    this.state = {
      name: ''
    }
  }

  onNameChanged = (e) => {
    this.setState({ name: e.target.value })
  }

  createQuiz = () => {
    this.props.actions.createQuiz(this.state.name);
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.onNameChanged} />
        <button onClick={this.createQuiz}>Create new Quiz</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(QuizActions, dispatch)
});

export default connect(undefined, mapDispatchToProps)(NewQuiz);

