const fetch = (url, options = {}) => new Promise((resolve, reject) => {
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
      return handleJSONResponse(response);
    })
    .catch(error => {
      console.error(error);
    });
});

const handleResponse = (response) => {
  let contentType = response.headers.get('content-type')
  if (contentType.includes('application/json')) {
    return handleJSONResponse(response)
  } else if (contentType.includes('text/html')) {
    return handleTextResponse(response)
  } else {
    // Other response types as necessary. I haven't found a need for them yet though.
    throw new Error(`Sorry, content-type ${contentType} not supported`)
  }
};

function handleJSONResponse (response) {
  return response.json()
    .then(json => {
      if (response.ok) {
        return json
      } else {
        return Promise.reject(Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText
        }))
      }
    })
}

export default fetch;
