/* Main library code
 */

import { isEqual } from 'lodash';
import reducers from './reducers';

class Observable {
  constructor(obj) {
    this.state = obj;
    this.callbacks = {};
  }
  /* private */
  broadcast(attr, value) {
    if (this.callbacks[attr]) {
      for (const callb of this.callbacks[attr]) {
        callb(value);
      }
    }
  }
  on(attr, callb) {
    this.callbacks[attr] = this.callbacks[attr] || [];
    this.callbacks[attr].push(callb);
  }
  emit(name, value) {
    const action = { name, value };
    // pass copy of the state to reducer so it could update it
    const reducedState = reducers(action, this.state);
    const newState = Object.assign({}, this.state, reducedState);
    this.broadcast(name, reducedState);
    if (!isEqual(this.state, newState)) {
      this.broadcast('stateChanged', newState);
      this.state = Object.assign({}, this.state, newState);
    } else {
      console.info('equal');
      console.info(newState);
    }
  }
}

function fetch(opts) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(opts.method, opts.url);
    xhr.onload = function onLoad() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function onError() {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    if (opts.headers) {
      Object.keys(opts.headers).forEach((key) => {
        xhr.setRequestHeader(key, opts.headers[key]);
      });
    }
    let params = opts.params;
    // We'll need to stringify if we've been given an object
    // If we have a string, this is skipped.
    if (params && typeof params === 'object') {
      params = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      }).join('&');
    }
    xhr.send(params);
  });
}

export default Observable;
export { Observable, fetch };
