import listener from './storage';

// you can just create TODOapp aclass
// to enable binding if template and data in js
//
listener.on('init', (state) => {
  const toDoItems = document.querySelectorAll('component');
  toDoItems.forEach((toDoItem) => {
    populate(toDoItem, state);
  });
});
listener.on('todo-add', (toDoItems) => {
  console.info(toDoItems);
  // qickly find a template in dom like
  // component:id is 1
  // component.find('data-template').is('#some').populate(toDoItems);
  // or use js Class of the component
  // to populate
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
    // set bindings here (data-binding="x")
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

