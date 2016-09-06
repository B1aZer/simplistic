import './todos/controller';
import listener from './todos/storage';

(function init(w) {
  const simplistic = {
    emit: (name, value) => listener.emit(name, value),
  };
  w.s = simplistic;
}(window));

$(() => listener.emit('init'));
