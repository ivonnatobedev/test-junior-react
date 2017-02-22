import {API_ENDPOINT} from '../const/system';

export function fetchWrapper(url = '', options = {}) {
  return fetch(API_ENDPOINT + url, options)
    .then(status)
    .then(json)
    .then(success => {
      return success;
    })
    .catch((e) => {
      throw e;
    });
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}

function json(response) {
  return response.json();
}

export function getOpt(method, data = '') {
  if(method == 'get' || method == 'delete') {
    return {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  } else {
    return {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  }

}