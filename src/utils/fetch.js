import {logout} from 'actions/users';

const fetch = (url, options = {}) => new Promise((resolve, reject) => {
  options.headers = options.headers || {};
  options.method = options.method || 'GET';

  Object.assign(options.headers, {
    'Authorization': window.sessionStorage.getItem('token')
  });

  window.fetch(url, options)
    .then(response => {
      return responseHandler(response);
    })
    .then(response => {
      return resolve(response);
    })
    .catch(e => reject(e));
});

const responseHandler = (response, type) => {
    if(response.status === 401) {
        logout();
    } else {
        return response.json();
    }
};

export default fetch;
