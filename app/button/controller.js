import $ from 'jquery';
import listener from './storage';

$(() => {
  listener.on('init', (toDoItems) => {
    if (toDoItems.length === 2) {
      $('attr-x').hide();
    }
  });
  listener.on('todo-add', (value) => {
    listener.emit('change-y');
    $('attr-x').html(value);
    $('attr-x').show();
  });
  listener.on('change-y', (value) => {
    console.info('changed Y');
  });
});
