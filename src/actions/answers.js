import actionTypes from 'actions/actionTypes';
import fetch from 'utils/fetch';

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

// export const updateQuestionAnswer = (key, value, answerId) => {
//   return (dispatch, getState) => {
//     const questionId = getState().questions.question._id;
//
//     fetch(`/api/questions/${questionId}/answers/${answerId}`, {
//       method: 'put',
//       headers: new Headers({
//         'Content-Type': 'application/json'
//       }),
//       body: JSON.stringify({
//         [key]: value
//       })
//     }).then(function (response) {
//       return response.json();
//     }).then(function (response) {
//       dispatch(questionUpdated(response));
//     }).catch(function (err) {
//       console.log(err);
//     });
//   }
// };
//
export const deleteAnswer = (quizId, questionId, answerId) => {
  return (dispatch, getState) => {

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
