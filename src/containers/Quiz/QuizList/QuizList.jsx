import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';

// Actions
import * as QuizActions from 'actions/quizzes';

// Selectors
import { SELECTORS as SELECTORS_QUIZZES } from 'reducers/quizzes';
import {SELECTORS as SELECTORS_USER} from 'reducers/user';

// Utils
import {getDate} from 'utils/dates';

// CSS
import './_quiz-list.scss';

export class QuizList extends React.Component {

  constructor(props) {
    super(props);

    this.props.actions.loadQuizzes();
  }

  onDeleteQuiz = (e) => {
      this.props.actions.deleteQuiz(e.target.getAttribute('id'));
  }

  render() {
    const { quizzes, user } = this.props;

    return (
      <div>
        <Link to={`new-quiz`}>New quiz</Link>
        <table className="quiz-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Created</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
          {quizzes && quizzes.map(item => (
            <tr key={item._id}>
              <td>
                <Link to={`${item._id}`}>{item.name}</Link>
              </td>
              <td>
                {`${item.creator.profile.firstName} ${item.creator.profile.lastName}`}
              </td>
              <td>
                {getDate(item.createdAt)}
              </td>
              <td>
                <button id={item._id} onClick={this.onDeleteQuiz}>Delete</button>
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
    quizzes: SELECTORS_QUIZZES.getQuizzes(state),
    user: SELECTORS_USER.getUser(state)
  }
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(QuizActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
