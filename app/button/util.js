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
  emit(name) {
    const reducers = combine([reducerToDo, reducerOther]);
    const state = reducers(name, this.state);
    console.info(state);
    this.broadcast(name, state);
  }
}

/* TODO: move to reducers */
function reducerToDo(name, state) {
  if (name === 'todo-add') {
    const toDoItems = [
      ...state.toDoItems,
      {
        id: 3,
        name: 'test3',
      },
    ];
    return toDoItems;
  }
  return state;
}

function reducerOther(name, state) {
  return state;
}

/* UTIL */

function combine(lst) {
  return (name, state) => {
    let res;
    for (const f of lst) {
      res = f(name, res || state);
    }
    return res;
  };
}

export default Observable;
