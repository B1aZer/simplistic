import $ from 'jquery';
import listener from './storage';

$(() => {
  listener.onChange('x', (value) => {
    listener.change('y');
  });
  listener.onChange('y', (value) => {
  });
  listener.change('x');
});
