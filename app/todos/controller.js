import listener from './storage';

// you can just create TODOapp aclass
// to enable binding if template and data in js
//
listener.on('init', (state) => {
  const body = document.querySelector('body');
  templating(body);
  populate(body, state);
  cleanup();
});
listener.on('todo-add', (state) => {
  //const body = document.querySelector('body');
  const todo = document.querySelector('#to-do-item');
  populate(todo, state);
  cleanup();
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

function populate(item, state) {
  console.info(item);
  console.info(state);
  const bindings = item.querySelectorAll('[data-state]');
  bindings.forEach((_item) => {
    if (hasClass(_item, 'populated')) return;
    const stateVar = _item.dataset.state;
    const newState = state[stateVar];
    addClass(_item, 'populated');
    populate(_item, newState);
    replaceBindings(_item, newState);
  });
  replaceBindings(item, state);
}

function replaceBindings(item, state) {
  /*
   * Makes sense to remove css classes
   * and merge with populate
   */
  if (!state) return;
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
  if (typeof value === 'undefined') return;
  if (Array.isArray(value)) {
  } else if (typeof value === 'object') {
  } else if (typeof value === 'function') {
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
  console.dir(clone);
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
    console.info(newItem);
    //const reg = new RegExp(`{{\\s*${key}\\s*}}`, 'ig');
    //clone.innerHTML = clone.innerHTML.replace(reg, value);
  }
}

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
