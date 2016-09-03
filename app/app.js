import $ from 'jquery';

import './button/controller';
import listener from './button/storage';

(function init(w) {
  const simplistic = {
    emit: (name) => listener.emit(name),
  };
  w.s = simplistic;
}(window));

$(() => listener.emit('init'));
