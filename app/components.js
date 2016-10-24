/*
 * usage
s.defineTag({
  name: 'if',
  link: function(el, value) {
    if (value) {
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  }
})
*/

/* proper way:
 * class HelloWorld extends Simple.Component
 *
 * class Component() {
 *   name - component attr/tag
 *   compile - additional logic, we need to parse template here. Define how/when lostener would be called
 *   getState/define listener - define listener logic for this coponent
 *   hasState(el, state) - run when state changed/ templae loaded/ component mount
 * }
 */

import listener from './todos/storage';
import { fetch } from './todos/util';

 /*
  * Since components does not hold state
  * we dont need classes. Simple object will do.
  * component[bind] = setBinding
  */
class TemplateComponent {
  constructor() {
    this.attribute = 'template';
  }
  setBinding(el, value) {
    fetch(value).$promise.then(function(template) {
      this.render(el, template);
      bootstrap(el);
    }, function() {
    });
  }
  render(el, state) {
    const element = el;
    element.innerHTML = state;
  }
}

/* THis is a modifyier component that would change behavior 
 * of bind and emit tags
 */

class ReduceComponent {
  constructor() {
    this.attribute = 'reduce';
  }
  setBinding(el, value) {
    const reducer = recucers[value];
    // we may need to reduce signal visibility (of el?) for this to work
    //
    // for bind
    // listen.on('stateChanged') -> state;
    // listen.broadcast(reducedState, reducer(state))
    //
    // for emit
    // listen.on('reducedState' -> value
    // listen.emit(this.Name, value)
    /* this component should intercept all emit/on signals
     * on child el's and reduce them.
     */
  }
}

class EmitComponent {
  constructor() {
    this.attribute = 'emit';
  }
  setBinding(el, event) {
    el.setEventListener(evnt, function() {
      // get name from reduce component
      listener.emit('reducedState', el.value);
    })
  }

}

class BindComponent {
  constructor() {
    this.attribute = 'bind';
  }
  setBinding(el, value) {
    // initailly there is no reduced state, we will get all state.
    // But it should be reduced by reduce comonent
    // listen.on('reducedState', callb);
  }
  render(el, state) {
    const element = el;
    if (typeof state === 'undefined') return;
    if (Array.isArray(state)) {
      element.innerHTML = '[Array]';
    } else if (typeof state === 'object') {
      element.innerHTML = '[Object]';
    } else if (typeof state === 'function') {
      element.innerHTML = '[Function]';
    } else {
      element.innerHTML = state;
    }
  }
}

class CustomTag {
  constructor(obj) {
    this.name = obj.name;
    this.link = obj.link;
  }
}


