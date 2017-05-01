import actionTypes from 'actions/actionTypes';
import fetch from '../utils/fetch';

export function logoutUser() {
    console.log('logging out');
    window.location.href = '/';
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
        //dispatch(fetchUserInfo(json.user._id));
      dispatch(setUser(json.user));
      window.sessionStorage.setItem('token', json.token);
    }).catch(function (err) {
      console.log(err);
    });
  }
};

// export const authenticate = () => {
//   return (dispatch, getState) => {
//     const token = window.sessionStorage.getItem('token');
//
//     fetch(`api/users/`)
//   }
// };

function setUser(payload) {
  return {
    type: actionTypes.setUser,
    payload
  }
}
