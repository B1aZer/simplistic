class Observable {
  constructor(obj) {
    this.obj = obj;
    this.callbacks = {};
  }
  change(attr) {
    if (this.callbacks[attr]) {
      for (const callb of this.callbacks[attr]) {
        callb();
      }
    }
  }
  onChange(attr, callb) {
    console.info('onChange ' + attr);
    this.callbacks[attr] = this.callbacks[attr] || [];
    this.callbacks[attr].push(callb);
  }
}

export default Observable;
