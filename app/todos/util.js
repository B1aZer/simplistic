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

export default Observable;
