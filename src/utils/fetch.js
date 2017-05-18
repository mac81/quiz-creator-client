import actionTypes from 'actions/actionTypes';

const fetch = (url, options = {}, dispatch) => new Promise((resolve, reject) => {
  options.headers = options.headers || {};
  options.method = options.method || 'GET';

  Object.assign(options.headers, {
    'Content-Type': 'application/json',
    'Authorization': window.sessionStorage.getItem('token')
  });

  window.fetch(url, options)
    .then(response => {
      return handleResponse(response);
    })
    .then(response => {
      resolve(response);
    })
    .catch(error => {
      if(error.status === 401) {
        dispatch({
          type: actionTypes.authorizationFailed
        });
      }
    });
});

const handleResponse = (response) => {
  if(response.status === 401) {
    return Promise.reject({
      status: response.status,
      statusText: response.statusText
    });
  } else {
    return response.json();
  }
};

export default fetch;
