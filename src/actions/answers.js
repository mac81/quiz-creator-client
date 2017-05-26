import actionTypes from 'actions/actionTypes';
import fetch from 'utils/fetch';
import {getRouteIds} from 'utils/utils';

export const loadAnswers = (quizId, questionId) => {
  return (dispatch, getState) => {

    //const questionId = getState().questions.question._id;

    fetch(`/api/quiz/${quizId}/questions/${questionId}/answers`, {}, dispatch)
      .then(function (response) {
        dispatch(setAnswers(response));
      });
  }
};

export const createAnswer = (quizId, questionId) => {
  return (dispatch, getState) => {

    //const questionId = getState().questions.question._id;

    fetch(`/api/quiz/${quizId}/questions/${questionId}/answers`, {
      method: 'post',
      body: JSON.stringify({
        answerText: ''
      })
    }).then(function (response) {
      dispatch(answerCreated(response));
    });
  }
};

export const updateAnswer = (match, key, value, answerId) => {
  return (dispatch, getState) => {

    const {quizId, questionId} = getRouteIds(match);

    fetch(`/api/quiz/${quizId}/questions/${questionId}/answers/${answerId}`, {
      method: 'put',
      body: JSON.stringify({
        [key]: value
      })
    }, dispatch).then(function (payload) {
      dispatch(answerUpdated(payload));
    });
  }
};

export const deleteAnswer = (match, answerId) => {
  return (dispatch, getState) => {

    const {quizId, questionId} = getRouteIds(match);

    fetch(`/api/quiz/${quizId}/questions/${questionId}/answers/${answerId}`, {
      method: 'delete'
    }).then(function () {
      dispatch(answerDeleted(answerId));
    });
  }
};

// function questionAnswerDeleted(answer_id) {
//   return {
//     type: actionTypes.questionAnswerDeleted,
//     answer_id
//   }
// }

function answerCreated(payload) {
  return {
    type: actionTypes.answerCreated,
    payload
  }
}

function answerUpdated(payload) {
  return {
    type: actionTypes.answerUpdated,
    payload
  }
}

function answerDeleted(payload) {
  return {
    type: actionTypes.answerDeleted,
    payload
  }
}

function setAnswers(answers) {
  return {
    type: actionTypes.setAnswers,
    answers
  }
}
