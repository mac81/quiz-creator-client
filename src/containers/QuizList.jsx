import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import * as QuizActions from 'actions/quizzes';
import { SELECTORS } from 'reducers/quizzes';

export class QuizList extends React.Component {

  constructor(props) {
    super(props);

    this.props.actions.loadQuizzes();
  }

  render() {
    const { quizzes } = this.props;

    return (
      <div>
        <ul>
          {quizzes && quizzes.map(item => (
            <li key={item._id}>
              <button id={item._id} onClick={this.onDelete}>Delete</button>
              <Link to={`quizzes/${item._id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    quizzes: SELECTORS.getQuizzes(state)
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(QuizActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);