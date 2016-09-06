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
    const reducers = combine([reducerToDo, reducerOther]);
    const state = reducers(name, value, this.state);
    this.broadcast(name, state);
  }
}

/* TODO:
 * move to reducers
 * immutable
 */
function reducerToDo(name, value, state) {
  if (name === 'todo-add') {
    state.toDoItems = [
      ...state.toDoItems,
      state.newTodo,
    ];
    return state.toDoItems;
  } else if (name === 'todo-new-update') {
    state.newTodo.name = value;
    return state.newTodo;
  }
  return state;
}

function reducerOther(name, value, state) {
  return state;
}

/* UTIL */

function combine(lst) {
  return (name, value, state) => {
    let res;
    for (const f of lst) {
      res = f(name, value, res || state);
    }
    return res;
  };
}

export default Observable;
