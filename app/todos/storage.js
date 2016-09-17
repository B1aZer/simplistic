import Observable from './util';

const state = {
  /* Other Reducer */
  x: {
    a: 1,
  },
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
    id: 0,
    name: '',
    tasks: [
      {
        id: 1,
      },
    ],
  },
};

const listener = new Observable(state);

export default listener;

