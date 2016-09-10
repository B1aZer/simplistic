import './todos/controller';
import listener from './todos/storage';

(function init(w) {
  const simplistic = {
    emit: (name, value) => listener.emit(name, value),
  };
  w.s = simplistic;
}(window));

ready(() => listener.emit('init'));

// we could append templates to elements here
// <tag template="some" data="item"
// then create a function that would recursevly
// merge data with template if that data
// has objects or primitives. If the primitive
// is array then merge and append each item to
// parent. If array is empty don'r render.
//
// XSS CHECK

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

