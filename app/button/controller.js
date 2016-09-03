import $ from 'jquery';
import listener from './storage';

$(() => {
  listener.onChange('todo-added', (value) => {
    listener.emit('change-y');
    $('attr-x').html(value);
  });
  listener.onChange('changed-y', (value) => {
    console.info('wow2');
  });
});
