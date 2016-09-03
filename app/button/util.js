class Observable {
  constructor(obj) {
    this.state = obj;
    this.callbacks = {};
  }
  broadcast(attr) {
    if (this.callbacks[attr]) {
      for (const callb of this.callbacks[attr]) {
        callb();
      }
    }
  }
  onChange(attr, callb) {
    this.callbacks[attr] = this.callbacks[attr] || [];
    this.callbacks[attr].push(callb);
  }
  emit(name) {
    if (name === 'todo-add') {
      this.state.toDoItems.push({
        id: 3,
        name: 'test3',
      });
      this.broadcast('todo-added', this.state.toDoItems.length);
    } else if (name === 'change-x') {
      this.broadcast('changed-x');
    } else if (name === 'change-y') {
      this.broadcast('changed-y');
    }
  }
}

export default Observable;
