import Observable from './util';

const state = {
  /* Other Reducer */
  x: 1,
  y: 1,
  /* toDoItems Reducer */
  toDoItems: [
    {
      id: 1,
      name: 'test1',
    },
    {
      id: 1,
      name: 'test2',
    },
  ],
};

const listener = new Observable(state);

export default listener;

