import Observable from './util';

const state = {
  x: 1,
  y: 1,
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

