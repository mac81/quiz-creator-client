import actionTypes from 'actions/actionTypes';
import fetch from 'utils/fetch';
import {push} from 'react-router-redux';

export const loadQuestions = (quizId) => {
  return (dispatch, getState) => {
    //dispatch(fetchQuestions());

    //const quizId = getState().quizzes.quiz._id;

    fetch(`/api/quiz/${quizId}/questions`)
      .then(function (data) {
      console.log(data);
      dispatch(setQuestions(data));
    });
  }
};

export const loadQuestion = (quizId, questionId) => {
  return (dispatch, getState) => {
    //dispatch(fetchQuestions());
    //const quizId = getState().quizzes.quiz._id;

    fetch(`/api/quiz/${quizId}/questions/${questionId}`)
      .then(function (data) {
        console.log(data);
        //dispatch(setQuestion(data));
      });
  }
};

export const createQuestion = (questionText = '', insertPosition, position) => {
  return (dispatch, getState) => {

    const quizId = getState().quizzes.quiz._id;

    fetch(`/api/quiz/${quizId}/questions`, {
      method: 'post',
      body: JSON.stringify({
        questionText,
        insertPosition,
        position
      })
    }).then(function (response) {
      dispatch(questionCreated(response.payload));
      dispatch(push(`${quizId}/questions/${response.payload._id}`));
    });
  }
};

export const createAnswer = () => {
  return (dispatch, getState) => {

    const questionId = getState().questions.question._id;

    fetch(`/api/questions/${questionId}/answers`, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        answerText: 'Test'
      })
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      dispatch(questionCreated(response.payload));
    }).catch(function (err) {
      console.log(err);
    });
  }
};

export const deleteQuestion = (question_id) => {
  return (dispatch, getState) => {
    fetch(`/api/questions/${question_id}`, {
      method: 'delete',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
      })
    }).then(function (response) {
      return response.json();
    }).then(function () {
      dispatch(questionDeleted(question_id));
    }).catch(function (err) {
      console.log(err);
    });
  }
};

export const updateQuestion = (key, value) => {
  return (dispatch, getState) => {
    const questionId = getState().questions.question._id;

    fetch(`/api/questions/${questionId}`, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.sessionStorage.getItem('token')}`
      }),
      body: JSON.stringify({
        [key]: value
      })
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      dispatch(questionUpdated(response));
    }).catch(function (err) {
      console.log(err);
    });
  }
};

export const updateQuestionAnswer = (key, value, answerId) => {
  return (dispatch, getState) => {
    const questionId = getState().questions.question._id;

    fetch(`/api/questions/${questionId}/answers/${answerId}`, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        [key]: value
      })
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      dispatch(questionUpdated(response));
    }).catch(function (err) {
      console.log(err);
    });
  }
};

export const deleteQuestionAnswer = (answerId) => {
  return (dispatch, getState) => {

    const questionId = getState().questions.question._id;

    fetch(`/api/questions/${questionId}/answers/${answerId}`, {
      method: 'delete'
    }).then(function (response) {
      return response.json();
    }).then(function () {
      dispatch(questionAnswerDeleted(answerId));
    }).catch(function (err) {
      console.log(err);
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

function questionAnswerDeleted(answer_id) {
  return {
    type: actionTypes.questionAnswerDeleted,
    answer_id
  }
}
