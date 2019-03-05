import React from 'react'; 
import {createStore} from 'redux';
import {render} from 'react-dom';
import Generation from './components/Generation';
import Corgi from './components/Corgi';


const DEFAULT_GENERATION = {generationId: '', expiration: ''};
const generationReducer = (state, action) => {
  console.log('generationReducer state', state);
  console.log('action', action);

  if (action.type === 'GENERATION_ACTION_TYPE') {
    return { generation:action.generation};
  }
  return {
    
    generation: DEFAULT_GENERATION
  }
};

const store = createStore(generationReducer);
console.log('store', store);
console.log('store.getState()', store.getState());

store.dispatch({type: "foo"});
store.dispatch({
  type: 'GENERATION_ACTION_TYPE',
  generation: {generationId: 'goo', expiration: 'bar'}
});

console.log('store.getState()', store.getState());

render(
  <div>
    <h2>Corgi Stack</h2>
    <Corgi />
    <Generation />
  </div>,
  document.getElementById('root') 
);