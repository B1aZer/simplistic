import { partialRight, unary, get } from 'lodash';
import listener from './todos/storage';

// we need to move this to a controller or
// element related portion of the code
listener.on('init', (state) => {
  const body = document.querySelector('body');
  //templating(body);
  //createBindings(body);
  //populate(body, state);
  //cleanup();
  bootstrap(body);
});

/*
 * SomeTree()
 *
 * simple tree:
 * https://code.tutsplus.com/articles/data-structures-with-javascript-tree--cms-23393
 *
 * maybe create binary tree
 * el:
 * left: children
 * right: parent
 *
 * To quicky knwo if this is a child or a
 * parent.
 *
 */

function bootstrap(el) {
  const bindings = el.querySelectorAll('[data-*]');
  if (hasClass(el, 'sed')) {
    return;
  }
  bindings.forEach((_item) => {
    console.info(_item);
    addClass(_item, 'sed');
    bootstrap(_item);
    // component = new BindComponent(state?)
    // component.setbinding(el, valueS);
    // where values -> values[this.attribute];
  });
  // processSelf
  // someTree.addAdjustedNode(el);
  // pos = sometree.getPosition()
  // state = getState(pos)
  // compnent.setBindin(el, state)
}

// we only need to set watchers in bootstrap
//
// all DOM manipulations should be defined in customTags(atrributes)
// so that new tags/atrributes could be added easily.
//
// we need to set callbacks for async events (template loading), this
// callback should also be defind in CustomTags. Bootstrap should be
// on result of this callback (and be recursive).
//
// We need to remove data-state attribute as it would only make sense
// with data-template. Do we could merge hem together in a single
// tag/attribute.
//
// Templating/Binding logic should be encapsulated in a single DOM
// driver module. IT would take care of CustomTags/attributes
// processing by setting watchers (with async support).
//
// Pseudo code:
//
// *. Take all custom defined tags/attributes.
// *. Set watchers for each one,
// *. Define custom methods (StateCHanged/TemplateLoaded) hasState
// *. and set them as callback to watchers.

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
