import actionTypes from 'actions/actionTypes';
import fetch from '../utils/fetch';
import { push } from 'react-router-redux';

export const signin = (email, password) => {
  return (dispatch, getState) => {
    fetch('/api/auth/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      })
    }).then(function (response) {
      dispatch(setUser(response));
      dispatch(push('/quizzes'));
    });
  }
};

export const signup = (email, password, firstname, lastname) => {
  return (dispatch, getState) => {
    fetch('/api/auth/register', {
      method: 'post',
      body: JSON.stringify({
        email,
        password,
        firstName: firstname,
        lastName: lastname
      })
    }).then(function (response) {
      dispatch(setUser(response));
    });
  }
};

export function signOut() {
  return (dispatch, getState) => {
    window.sessionStorage.clear();
    dispatch({
      type: actionTypes.unSetUser
    });
  }
}

export const authenticate = () => {
  return (dispatch, getState) => {

    dispatch({
      type: actionTypes.isAuthenticating
    });

    const userId = window.sessionStorage.getItem('userId');
    const token = window.sessionStorage.getItem('token');

    if(userId && token) {
      fetch(`/api/users/${userId}`, {}, dispatch)
        .then(response => {
          dispatch(setUser(response));
        });
    } else {
      dispatch(push('/signin'));
    }
  }
};

function setUser(payload) {

  window.sessionStorage.setItem('userId', payload.user._id);
  if(payload.token) {
    window.sessionStorage.setItem('token', payload.token);
  }

  return {
    type: actionTypes.setUser,
    payload: payload.user
  }
}
