import actionTypes from 'actions/actionTypes';

export const signin = (username, password) => {
  return (dispatch, getState) => {
    fetch('/api/users/signin', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        username,
        password
      })
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      window.sessionStorage.setItem('token', json);
    }).catch(function (err) {
      console.log(err);
    });
  }
};