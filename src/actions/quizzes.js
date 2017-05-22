import actionTypes from 'actions/actionTypes';
import fetch from '../utils/fetch';
import { push } from 'react-router-redux';

import {loadQuestions} from 'actions/questions';

export const loadQuizzes = () => {
  return (dispatch, getState) => {
    fetch('/api/quiz', {}, dispatch)
      .then(response => {
        dispatch(setQuizzes(response.payload));
      }).catch(err => {
        console.log('err:', err);
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

export const deleteQuiz = (quizId) => {
  return (dispatch, getState) => {
    fetch(`/api/quiz/${quizId}`, {
      method: 'delete'
  }).then(function (response) {
      dispatch(quizDeleted(quizId));
      //dispatch(push(`/${quizId}`));
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

function quizDeleted(quizId) {
  return {
    type: actionTypes.quizDeleted,
    quizId
  }
}
