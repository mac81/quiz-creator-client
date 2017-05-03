import actionTypes from 'actions/actionTypes';
import fetch from '../utils/fetch';

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

function signOut() {
  return (dispatch, getState) => {
    window.sessionStorage.clear();
    dispatch({
      type: actionTypes.unSetUser
    });
  }
}

export const getUserInfo = () => {
  return (dispatch, getState) => {

    const userId = window.sessionStorage.getItem('userId');
    const token = window.sessionStorage.getItem('token');

    if(userId && token) {
      fetch(`/api/users/${userId}`)
        .then(response => {
          if(response.status === 401) {
            dispatch(signOut());
          } else {
            dispatch(setUser(response));
          }
        });
    }
  }
};

function setUser(payload) {

  window.sessionStorage.setItem('userId', payload.user._id);
  window.sessionStorage.setItem('token', payload.token);

  return {
    type: actionTypes.setUser,
    payload: payload.user
  }
}
