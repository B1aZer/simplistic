import listener from './storage';

listener.on('init', (state) => {
  const toDoItem = document.querySelector('to-do-item');
  const templateId = toDoItem.dataset.template;
  const stateVar = toDoItem.dataset.state;
  const template = document.querySelector(templateId);
  const clone = template.cloneNode(true);
  const newItem = state[stateVar];
  for (const key of Object.keys(newItem)) {
    const reg = new RegExp(`{{\\s*${key}\\s*}}`, 'ig');
    clone.innerHTML = clone.innerHTML.replace(reg, newItem[key]);
  }
  const fragment = document.importNode(clone.content, true);
  const host = document.querySelector('to-do-item');
  host.appendChild(fragment);
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
