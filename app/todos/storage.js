/* This is a place where all state should be defined.
 * It should not be defined in any other place
 */

import Observable from './util';

const state = {
  /* Other Reducer */
  x: {
    a: 1,
    x: {
      b: 'b',
    },
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

