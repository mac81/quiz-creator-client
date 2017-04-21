import React from 'react';
import { history } from '../store';
import {connect} from 'react-redux';
import { SELECTORS } from 'reducers/questions';

import {RaisedButton} from 'material-ui';
import AddIcon from 'material-ui/svg-icons/content/add';

const LinkButton = ({ router, question, label, insertPosition }) => {
  const paths = router.location.pathname.split('/');
  const quizId = paths[1];
console.log(label);
  return (
    <RaisedButton
      label={label}
      labelPosition="before"
      secondary={true}
      onClick={() => {
        history.push(`/${quizId}/questions?${insertPosition}=${question._id}`)
      }}
      icon={<AddIcon/>}
    />
  )
};

const mapStateToProps = (state) => {
  return {
    router: state.router,
    question: SELECTORS.getQuestion(state)
  }
};

export default connect(mapStateToProps)(LinkButton);