import actionTypes from 'actions/actionTypes';
import fetch from 'utils/fetch';
import {push} from 'react-router-redux';

export const loadQuestions = (quizId) => {
  return (dispatch, getState) => {
    //dispatch(fetchQuestions());

    //const quizId = getState().quiz._id;

    fetch(`/api/quiz/${quizId}/questions`, {}, dispatch)
      .then(function (data) {
        dispatch(setQuestions(data));
      });
  }
};

export const loadQuestion = (quizId, questionId) => {
  return (dispatch, getState) => {
    //dispatch(fetchQuestions());
    //const quizId = getState().quizzes.quiz._id;

    fetch(`/api/quiz/${quizId}/questions/${questionId}`, {}, dispatch)
      .then(function (data) {
        dispatch(setQuestion(data));
      });
  }
};

export const createQuestion = (questionText = '', insertPosition, position) => {
  return (dispatch, getState) => {

    const quizId = getState().quiz._id;

    fetch(`/api/quiz/${quizId}/questions`, {
      method: 'post',
      body: JSON.stringify({
        questionText,
        insertPosition,
        position
      })
    }).then(function (response) {
      dispatch(questionCreated(response.payload));
      dispatch(loadQuestions(quizId));
      dispatch(push(`/${quizId}/questions/${response.payload._id}`));
    });
  }
};

export const deleteQuestion = (questionId) => {
  return (dispatch, getState) => {

    const quizId = getState().quiz._id;

    fetch(`/api/quiz/${quizId}/questions/${questionId}`, {
      method: 'delete'
    }).then(function () {
        dispatch(questionDeleted(questionId));
        dispatch(push(`/${quizId}/questions`));
      });
  }
};

export const updateQuestion = (key, value) => {
  return (dispatch, getState) => {

    const state = getState();
    const quizId = state.quiz._id;
    const questionId = state.question.question._id;

    fetch(`/api/quiz/${quizId}/questions/${questionId}`, {
      method: 'put',
      body: JSON.stringify({
        [key]: value
      })
    }).then(function (response) {
      dispatch(questionUpdated(response));
    });
  }
};



function fetchQuestions() {
  return {
    type: actionTypes.fetchQuestions
  }
}

function setQuestions(payload) {
  return {
    type: actionTypes.setQuestions,
    payload
  }
}

function fetchQuestion() {
  return {
    type: actionTypes.fetchQuestion
  }
}

function setQuestion(payload) {
  return {
    type: actionTypes.setQuestion,
    payload
  }
}

function questionCreated(payload) {
  return {
    type: actionTypes.questionCreated,
    payload
  }
}

function questionDeleted(question_id) {
  return {
    type: actionTypes.questionDeleted,
    question_id
  }
}

function questionUpdated(payload) {
  return {
    type: actionTypes.questionUpdated,
    payload
  }
}
