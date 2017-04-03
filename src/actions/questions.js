import actionTypes from 'actions//actionTypes';
import {normalize, schema} from 'normalizr';

const answer = new schema.Entity('answers', {}, {idAttribute: '_id'});

const question = new schema.Entity('questions', {
  answers: [answer]
}, {idAttribute: '_id'});

const responseSchema = [question];

export const loadQuestions = () => {
  return (dispatch, getState) => {
    dispatch(fetchQuestions());
    fetch('/api/questions', {
      method: 'get'
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      const normalizedData = normalize(data, responseSchema);
      dispatch(setQuestions(normalizedData));
    }).catch(function (err) {
      console.log(err);
    });
  }
};

export const createQuestion = (questionName) => {
  return (dispatch, getState) => {
    fetch(`/api/questions`, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        question: questionName
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
      method: 'delete'
    }).then(function (response) {
      return response.json();
    }).then(function () {
      dispatch(questionDeleted(question_id));
    }).catch(function (err) {
      console.log(err);
    });
  }
};

export const updateQuestion = (question_id, key, value) => {
  return (dispatch, getState) => {
    fetch(`/api/questions/${question_id}`, {
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
      dispatch(questionUpdated(response.payload));
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

function setQuestions(questions) {
  return {
    type: actionTypes.setQuestions,
    questions
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