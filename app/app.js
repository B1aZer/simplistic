import './bootstrap';
import './todos/controller';
import './components';
import listener from './todos/storage';

(function init(w) {
  const simplistic = {
    emit: (name, value) => listener.emit(name, value),
  };
  w.s = simplistic;
}(window));

//
// This event should fired when all
// async code is finished
ready(() => { listener.emit('init'); console.timeStamp('init'); });

// we could append templates to elements here
// <tag template="some" data="item"
// then create a function that would recursevly
// merge data with template if that data
// has objects or primitives. If the primitive
// is array then merge and append each item to
// parent. If array is empty don'r render.
//
// XSS CHECK
//
// It makes sense to separate bind and template
// and remove Component completely.
// Bind could create new scope. Like bind="array"
// {{ element[0].one }} or similar.
// In this case we would create full template
// first and apply binding after that.
//
// ADD PREFIX
//
// move templates to separate files
//
// eliminate append and any other html manipulations
// count only on template custom tags/attriutes and
// scope 'populate'
//
// We could create HTML driver that would update DOM
// based on tags. It could watch state and make efficient
// updates. In this case we would eliminate any
// controller DOM manipulations.
//
// We need to structure app as libraray.
// Meaning we need to abstract all methods to single
// file and eexport from that file.
//
// Dependant files could either import methods from that
// file or import whole library and use something like
// s.defineTag or s.defineStorage.

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

