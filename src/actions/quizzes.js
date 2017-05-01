import actionTypes from 'actions/actionTypes';
import fetch from '../utils/fetch';

import {loadQuestions} from 'actions/questions';

export const loadQuizzes = () => {
  return (dispatch, getState) => {
    fetch('/api/quiz')
        .then(response => {
            response && dispatch(setQuizzes(response.payload));
        });
  }
};

export const loadQuiz = (quizId) => {
  return (dispatch, getState) => {
    fetch(`/api/quiz/${quizId}`, {
      method: 'get',
      headers: new Headers({
        'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
      }),
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      dispatch(setQuiz(data));
      dispatch(loadQuestions(data._id));
    }).catch(function (err) {
      console.log(err);
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
