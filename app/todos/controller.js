import listener from './storage';

listener.on('init', (state) => {
  if (state.toDoItems.length === 2) {
    $('attr-x').hide();
  }
});
listener.on('todo-add', (toDoItems) => {
  // TODO: use template here
  const toDoList = document.querySelectorAll('to-do-list')[0];
  toDoList.innerHTML = '';
  for (const item of toDoItems) {
    // This should be as easy as $(<ProviderItem>).populate(providerObj) //
    const itemTemplate = `<div><span class="name">${item.name}</span></div>`;
    toDoList.insertAdjacentHTML('beforeend', itemTemplate);
    // Dom search should e as easy as $('<item>').attr(id).is(1)
  }
  // !IMPORTATNT: no DOM traversing
  // $('attr-x').find('span').html(toDoItems.length);
  // $('attr-x').show();
});
listener.on('change-y', (value) => {
});
