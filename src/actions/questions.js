import actionTypes from 'actions//actionTypes';
// import {normalize, schema} from 'normalizr';
//
// const answer = new schema.Entity('answers', {}, {idAttribute: '_id'});
//
// const question = new schema.Entity('questions', {
//   answers: [answer]
// }, {idAttribute: '_id'});
//
// const responseSchema = [question];

export const loadQuestions = () => {
  return (dispatch, getState) => {
    dispatch(fetchQuestions());
    fetch('/api/questions', {
      method: 'get'
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      //const normalizedData = normalize(data, responseSchema);
      dispatch(setQuestions(data));
    }).catch(function (err) {
      console.log(err);
    });
  }
};

export const loadQuestion = (questionId) => {
  return (dispatch, getState) => {
    dispatch(fetchQuestions());
    fetch(`/api/questions/${questionId}`, {
      method: 'get'
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      dispatch(setQuestion(data));
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
      console.log(response);
      //dispatch(questionCreated(response.payload));
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

export const updateQuestion = (key, value) => {
  return (dispatch, getState) => {
    const questionId = getState().questions.question._id;

    fetch(`/api/questions/${questionId}`, {
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
      dispatch(questionUpdated(response.payload));
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
