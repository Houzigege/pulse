import fetch from 'dva/fetch';


const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://hrbotback.azurewebsites.net' : 'http://localhost:8000';

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [option] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const _param = (obj = {}) => {
  return Object.keys(obj).map(k => `${k}=${obj[k]}`).join("&");
};

export default function request(url, option) {
  const fetchUrl = BASE_URL + url;
  // const fetchUrl = 'https://hrbotback.azurewebsites.net' + url;
  // const fetchUrl = 'https://instagramdevapi.azurewebsites.net' + url + '?' + _param(option.body);
  const options = {
    ...option,
  };
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const defaultOptions = {
    // credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        // 'Content-Type': 'application/json; charset=utf-8',
        // "Content-Type": "application/javascript",
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  return fetch(fetchUrl, newOptions)
    .then(checkStatus)
    .then(response => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch(e => {
      console.log(e);
    });
}
