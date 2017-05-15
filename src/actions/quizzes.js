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
    fetch(`/api/quiz/${quizId}`, {}, dispatch)
      .then(function (data) {
        dispatch(setQuiz(data));
        //dispatch(loadQuestions(data._id));
    });
  }
};

export const createQuiz = (name) => {
  return (dispatch, getState) => {
    fetch(`/api/quiz`, {
      method: 'post',
      body: JSON.stringify({
        name
      })
    }).then(function (data) {
      const quizId = data.payload._id;
      dispatch(push(`/${quizId}`));
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
