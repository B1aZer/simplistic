import Observable from './util';

const state = {
  x: 1,
  y: 1,
};

const listener = new Observable(state);

export default listener;

