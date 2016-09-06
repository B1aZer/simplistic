import './todos/controller';
import listener from './todos/storage';

(function init(w) {
  const simplistic = {
    emit: (name, value) => listener.emit(name, value),
  };
  w.s = simplistic;
}(window));

ready(() => listener.emit('init'));

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

