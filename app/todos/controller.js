import listener from './storage';
// import listener from lib;

// you can just create TODOapp aclass
// to enable binding of template and data in js
//
// we can render template in several ways
// 1. Take portions of state, find where this state
// is defined and upadate only this element.
//
// 2. Take all state on each change and rerender
// whole app.
//
// 3. Set listeners on dynamic elements and update
// elements whose state changed.
//
// 3 makes most sense in erms of perfomance, usability.
//
// Pseude cycle:
//
// *. App init.
// *. Get initial state.
// *. Construct all templates.
// *. Bind every element to portion of the state based
//    on tags defined on element.
// *. State changes.
// *. Bindings changes if state is not the same.
//
listener.on('todo-add', (state) => {
  //const body = document.querySelector('body');
  const todo = document.querySelector('#to-do-item');
  // !!! wrong each object should be bound to state
  // so that we can track mutations
  // it should be populate(toDos, state(allItems)
  //
  // what do you mean by track mutations ?
  // all mutations are tracked in state
  const newTodo = todo.cloneNode(true);
  //populate(newTodo, state);
  //cleanup();
  document.querySelector('.to-do-list').appendChild(newTodo);


  // qickly find a template in dom like
  // component:id is 1
  // component.find('data-template').is('#some').populate(toDoItems);
  // or use js Class of the component
  // to populate
});
listener.on('change-y', (state) => {
});
listener.on('some-process', () => {
  // change x.x.b
  listener.emit('change-b');
});

