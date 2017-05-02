import actionTypes from 'actions/actionTypes';
import fetch from '../utils/fetch';

export function logout() {
  return (dispatch, getState) => {
    window.sessionStorage.clear();
    dispatch({
      type: actionTypes.unSetUser
    });
  }
}

export const signin = (email, password) => {
  return (dispatch, getState) => {
    window.fetch('/api/auth/login', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email,
        password
      })
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      console.log(json);
      dispatch(setUser(json.user));
      window.sessionStorage.setItem('userId', json.user._id);
      window.sessionStorage.setItem('token', json.token);
    }).catch(function (err) {
      console.log(err);
    });
  }
};

export const signup = (email, password, firstname, lastname) => {
  return (dispatch, getState) => {
    window.fetch('/api/auth/register', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email,
        password,
        firstName: firstname,
        lastName: lastname
      })
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      dispatch(setUser(json.user));
      window.sessionStorage.setItem('userId', json.user._id);
      window.sessionStorage.setItem('token', json.token);
    }).catch(function (err) {
      console.log(err);
    });
  }
};

export const getUserInfo = (userId = window.sessionStorage.getItem('userId')) => {
  return (dispatch, getState) => {

    if(userId) {
      fetch(`/api/users/${userId}`)
        .then(response => {
          dispatch(setUser(response.user));
        });
    }
  }
};

function setUser(payload) {
  return {
    type: actionTypes.setUser,
    payload
  }
}
