import actionTypes from 'actions/actionTypes';
import fetch from '../utils/fetch';
import { push } from 'react-router-redux';

import {loadQuestions} from 'actions/questions';

export const loadQuizzes = () => {
  return (dispatch, getState) => {
    fetch('/api/quiz')
      .then(response => {
          if(response.status === 401) {
            dispatch(push('/signin/'));
          } else {
            dispatch(setQuizzes(response.payload));
          }
      });
  }
};

export const loadQuiz = (quizId) => {
  return (dispatch, getState) => {
    fetch(`/api/quiz/${quizId}`)
      .then(function (data) {
        console.log(data);
        dispatch(setQuiz(data));
        //dispatch(loadQuestions(data._id));
    });
  }
};

function setQuizzes(payload) {
  return {
    type: actionTypes.setQuizzes,
    payload
  }
}

function setQuiz(payload) {
  return {
    type: actionTypes.setQuiz,
    payload
  }
}
