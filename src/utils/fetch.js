import * as actions from 'actions/application';

const fetch = (url, options = {}, dispatch) => new Promise((resolve, reject) => {
  options.headers = options.headers || {};
  options.method = options.method || 'GET';

  Object.assign(options.headers, {
    'Content-Type': 'application/json',
    'Authorization': window.sessionStorage.getItem('token')
  });

  window.fetch(url, options)
    .then(response => {
      return responseHandler(response, dispatch);
    })
    .then(response => {
      return resolve(response);
    })
    .catch(e => reject(e));
});

const responseHandler = (response, dispatch) => {
    if(response.status === 401) {
      return {
        status: response.status,
        statusText: response.statusText
      };
  } if(response.status === 404) {
      dispatch(actions.setStatus(response.status, response.statusText))
    //   return {
    //     status: response.status,
    //     statusText: response.statusText
    //   };
    } else {
        return response.json();
    }
};

export default fetch;
