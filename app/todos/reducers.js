export function reducerToDo(action, state) {
  const newState = Object.assign({}, state);
  if (action.name === 'todo-add') {
    newState.toDoItems = [
      ...state.toDoItems,
      state.newTodo,
    ];
    newState.newTodo.id += 1;
    return newState.newTodo;
  } else if (action.name === 'todo-new-update') {
    newState.newTodo.name = action.value;
    return newState.newTodo;
  }
  return newState;
}

export function reducerOther(action, state) {
  return state;
}

function combine(lst) {
  return (action, state) => {
    let res;
    for (const f of lst) {
      res = f(action, res || state);
    }
    return res;
  };
}


export default combine([reducerToDo, reducerOther]);
