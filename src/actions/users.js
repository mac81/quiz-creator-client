import actionTypes from 'actions/actionTypes';

export const signin = (username, password) => {
  return (dispatch, getState) => {
    fetch('/api/accounts/signin', {
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
      dispatch(setUser(json.user));
      window.sessionStorage.setItem('token', json.token);
    }).catch(function (err) {
      console.log(err);
    });
  }
};

function setUser(payload) {
  return {
    type: actionTypes.setUser,
    payload
  }
}