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
  const newState = extend({}, state);
  if (name === 'todo-add') {
    newState.toDoItems = [
      ...newState.toDoItems,
      newState.newTodo,
    ];
    return newState.toDoItems;
  } else if (name === 'todo-new-update') {
    newState.newTodo.name = value;
    return newState.newTodo;
  }
  return newState;
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

function extend(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    if (!arguments[i])
      continue;

    for (var key in arguments[i]) {
      if (arguments[i].hasOwnProperty(key))
        out[key] = arguments[i][key];
    }
  }

  return out;
}

export default Observable;
