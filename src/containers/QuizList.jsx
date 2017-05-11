import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import * as QuizActions from 'actions/quizzes';
import { SELECTORS } from 'reducers/quizzes';
import {SELECTORS as SELECTORS2} from 'reducers/user';

import {getDate} from 'utils/dates';

export class QuizList extends React.Component {

  constructor(props) {
    super(props);

    this.props.actions.loadQuizzes();
  }

  render() {
    const { quizzes, user } = this.props;

    return (
      <div>
        <Link to={`new-quiz`}>New quiz</Link>
        <ul>
          {quizzes && quizzes.map(item => (
            <li key={item._id}>
              <Link to={`${item._id}`}>{item.name}</Link>
              <span>Created: {getDate(item.createdAt)}</span>
              <button id={item._id} onClick={this.onDelete}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    quizzes: SELECTORS.getQuizzes(state),
    user: SELECTORS2.getUser(state)
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(QuizActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);