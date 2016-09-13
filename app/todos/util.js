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
    const reducedState = reducers(action, this.state);
    this.broadcast(name, reducedState);
  }
}

export default Observable;
