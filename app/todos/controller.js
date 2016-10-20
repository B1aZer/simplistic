import listener from './storage';
import { partialRight, unary, get } from 'lodash';

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
listener.on('init', (state) => {
  const body = document.querySelector('body');
  templating(body);
  createBindings(body);
  //populate(body, state);
  cleanup();
});
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
  populate(newTodo, state);
  cleanup();
  document.querySelector('.to-do-list').appendChild(newTodo);


  // qickly find a template in dom like
  // component:id is 1
  // component.find('data-template').is('#some').populate(toDoItems);
  // or use js Class of the component
  // to populate
});
listener.on('change-y', (state) => {
});

function templating(item) {
  const bindings = item.querySelectorAll('[data-template]');
  bindings.forEach((_item) => {
    const templateId = _item.dataset.template;
    const template = document.querySelector(templateId);
    const clone = template.cloneNode(true);
    const fragment = document.importNode(clone.content, true);
    _item.appendChild(fragment);
    templating(_item);
  });
}

/* we need to find all state and bind elements
 * make function for each element that would wrap
 * this element and path to this bindings in state.
 * Meaning:
 * el state = x
 *  el_child bind = y
 * function should take current state as input and
 * change html for el_child. It should wrap el_child
 * and path to state: y <- x of state object.
 * Pseoude code:
 * changeState = (state) {
 *  value = state[path]
 *  item.html(value)
 * }
 * changeState = wrap(el_child, path);
 * _release memory_
 */

let path = [];
function createBindings(item) {
  if (hasClass(item, 'binded')) return;
  // what if state attribute would be on body (1st elem of the cycle)
  const stateVar = item.dataset.state;
  if (stateVar) {
    path.push(stateVar);
  }
  const bindings = item.querySelectorAll('[data-state]');
  bindings.forEach((_item) => {
    // go to most deep state element
    createBindings(_item);
  });
    // all code should go here
    // as this is the place of the bottom
  const bindingsTwo = item.querySelectorAll('[data-bind]');
  const populateThisBinding = partialRight(populateBinding, path);
  bindingsTwo.forEach(unary(populateThisBinding));
  path.pop();
  addClass(item, 'binded');
}

function populateBinding(item, pathArr) {
  if (hasClass(item, 'populated')) return;
  let pathStr = pathArr.join('.');
  const variable = item.dataset.bind;
  listener.on('stateChanged', (newState) => {
    let value = get(newState, pathStr);
    let newVal = value[variable];
    replaceEl(item, newVal);
  });
  addClass(item, 'populated');
}

function populate(item, state) {
  if (!state) return;
  const bindings = item.querySelectorAll('[data-state]');
  bindings.forEach((_item) => {
    if (hasClass(_item, 'populated')) return;
    const stateVar = _item.dataset.state;
    const isArray = _item.dataset.array;
    const newState = state[stateVar];
    addClass(_item, 'populated');
    populate(_item, newState);
    replaceBindings(_item, newState, isArray);
  });
  replaceBindings(item, state);
}

function replaceBindings(item, state, isArray) {
  /*
   * Makes sense to remove css classes
   * and merge with populate
   */
  if (!state) return;
  if (isArray) {
  }
  const bindings = item.querySelectorAll('[data-bind]');
  bindings.forEach((_item) => {
    if (hasClass(_item, 'binded')) return;
    const variable = _item.dataset.bind;
    const value = state[variable];
    replaceEl(_item, value);
    addClass(_item, 'binded');
  });
}

function replaceEl(item, value) {
  console.info(item, value);
  if (typeof value === 'undefined') return;
  if (Array.isArray(value)) {
    item.innerHTML = '[Array]';
  } else if (typeof value === 'object') {
    item.innerHTML = '[Object]';
  } else if (typeof value === 'function') {
    item.innerHTML = '[Function]';
  } else {
    item.innerHTML = value;
  }
}

function cleanup() {
  const statings = document.querySelectorAll('[data-state]');
  statings.forEach((_item) => removeClass(_item, 'populated'));
  const bindings = document.querySelectorAll('[data-bind]');
  bindings.forEach((_item) => removeClass(_item, 'binded'));
}

// Deprecated
function replaceHtml(clone, newItem) {
  if (Array.isArray(newItem)) {
    const firstItem = newItem[0];
    // set bindings here (data-binding="x")
    for (const key of Object.keys(firstItem)) {
      const value = firstItem[key];
      const reg = new RegExp(`{{\\s*${key}\\s*}}`, 'ig');
      clone.innerHTML = clone.innerHTML.replace(reg, value);
    }
  } else if (typeof newItem === 'object') {
    for (const key of Object.keys(newItem)) {
      const value = newItem[key];
      const reg = new RegExp(`{{\\s*${key}\\s*}}`, 'ig');
      clone.innerHTML = clone.innerHTML.replace(reg, value);
    }
  } else {
    //const reg = new RegExp(`{{\\s*${key}\\s*}}`, 'ig');
    //clone.innerHTML = clone.innerHTML.replace(reg, value);
  }
}

// jQuery

function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

function removeClass(el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
}

function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
}
