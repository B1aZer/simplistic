/* Any state mutations are done here
 * We need to return only portions of the state
 * bu write whole state to state.object
*/

export function reducerToDo(action, state) {
  const newState = Object.assign({}, state);
  if (action.name === 'todo-add') {
    newState.toDoItems = [
      ...state.toDoItems,
      state.newTodo,
    ];
    newState.newTodo.id += 1;
    return newState;
  } else if (action.name === 'todo-new-update') {
    newState.newTodo.name = action.value;
    return newState;
  } else if (action.name === 'todo-click') {
    return newState;
  } else if (action.name === 'change-b') {
    newState.x.x.b = 3;
    return newState;
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
