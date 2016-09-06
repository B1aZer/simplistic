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
      tasks: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    },
    {
      id: 1,
      name: 'test2',
      tasks: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    },
  ],
  newTodo: {
    id: null,
    name: '',
    tasks: [],
  },
};

const listener = new Observable(state);

export default listener;

