import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom';
import * as QuizActions from 'actions/quizzes';
import { SELECTORS } from 'reducers/quizzes';
import {SELECTORS as SELECTORS2} from 'reducers/user';
import { Redirect } from 'react-router-dom';

export class QuizList extends React.Component {

  constructor(props) {
    super(props);

    this.props.actions.loadQuizzes();
  }

  render() {
    const { quizzes, user } = this.props;

    console.log('xxx', user);
    if(!user.isLoggedIn){
      return (
        <Redirect to={{
          pathname: '/',
          state: { from: '/quizzes' }
        }}/>
      )
    }

    return (
      <div>
        <ul>
          {quizzes && quizzes.map(item => (
            <li key={item._id}>
              <button id={item._id} onClick={this.onDelete}>Delete</button>
              <Link to={`${item._id}`}>{item.name}</Link>
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