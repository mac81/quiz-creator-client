import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as QuizActions from 'actions/quizzes';
import { SELECTORS as QUIZ_SELECTORS } from 'reducers/quiz';

class Deployment extends React.Component {

  render() {
    return (
      <div>
        Deployment<br/>
        Status: {this.props.isLive ? 'Live': 'Design'}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    isLive: QUIZ_SELECTORS.getQuizIsLive(state)
  }
};

const mapDispatchToProps = dispatch => ({
  quizActions: bindActionCreators(QuizActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Deployment);


