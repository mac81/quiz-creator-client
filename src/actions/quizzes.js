import actionTypes from 'actions/actionTypes';

import {loadQuestions} from 'actions/questions';

const fetch2 = (url, options = {}) => new Promise((resolve, reject) => {
  options.headers = options.headers || {};

  Object.assign(options.headers, {
    'Authorization': window.sessionStorage.getItem('token')
  });
console.log(options)
  fetch(url, options)
    .then(response => {
      errorHandler(response);
    })
    .then(response => {
      return resolve(response);
    })
    .catch(e => reject(e));
});

export const errorHandler = (response, type) => {
  return (dispatch, getState) => {
    let errorMessage = '';

    // if(error.data.error) {
    //   errorMessage = error.data.error;
    // } else if(error.data{
    //   errorMessage = error.data;
    // } else {
    //   errorMessage = error;
    // }

    if(error.status === 401) {
      return '401';
      // dispatch({
      //   type: type,
      //   payload: 'You are not authorized to do this. Please login and try again.'
      // });
      // logoutUser();
    } else {
      // dispatch({
      //   type: type,
      //   payload: errorMessage
      // });

      return response.json();
    }
  }
};

export const loadQuizzes = () => {
  return (dispatch, getState) => {


    fetch2('/api/quiz')
      .then(response => {
        // this.setState(state => ({
        //   user
        // }));
        console.log('xxx', response);
      });

    // console.log('load quizzes')
    // // dispatch(fetchQuestions());
    // fetch('/api/quiz', {
    //   method: 'get',
    //   headers: new Headers({
    //     'Authorization': window.sessionStorage.getItem('token')
    //   }),
    // }).then(function (response) {
    //   return errorHandler(response);
    //     //return response.json();
    // }).then(function (json) {
    //   //dispatch(setQuizzes(json.payload));
    // }).catch(function (err) {
    //   console.log(err);
    // });
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

