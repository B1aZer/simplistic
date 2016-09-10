import listener from './storage';

// you can just create TODOapp aclass
// to enable binding if template and data in js
//
listener.on('init', (state) => {
  const toDoItems = document.querySelectorAll('component');
  toDoItems.forEach((toDoItem) => {
    populate(toDoItem, state);
  });
  //populate('to-do-list-item', state);
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

function populate(item, state) {
  const templateId = item.dataset.template;
  const stateVar = item.dataset.state;
  const template = document.querySelector(templateId);
  const clone = template.cloneNode(true);
  const newItem = state[stateVar];
  const fragment = document.importNode(clone.content, true);
  const innerComps = fragment.querySelectorAll('component');
  innerComps.forEach((_item) => {
    populate(_item, newItem);
  });
  item.appendChild(fragment);
  replaceHtml(item, newItem);
}

function replaceHtml(clone, newItem) {
  if (Array.isArray(newItem)) {
    const firstItem = newItem[0];
    for (const key of Object.keys(firstItem)) {
      const value = firstItem[key];
      const reg = new RegExp(`{{\\s*${key}\\s*}}`, 'ig');
      clone.innerHTML = clone.innerHTML.replace(reg, value);
    }
  } else if (typeof newItem === 'object') {
    for (const key of Object.keys(newItem)) {
      const value = newItem[key];
      const reg = new RegExp(`{{\\s*${key}\\s*}}`, 'ig');
      clone.innerHTML = clone.innerHTML.replace(reg, value);
    }
  } else {
    console.info(newItem);
    //const reg = new RegExp(`{{\\s*${key}\\s*}}`, 'ig');
    //clone.innerHTML = clone.innerHTML.replace(reg, value);
  }
}

