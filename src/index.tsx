import { Provider } from 'mobx-react';
import 'phaser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Index from './pages/index';
import editorStore from './stores/editorStore';
import emitterStore from './stores/emitterStore';

const stores = {
  editorStore,
  emitterStore,
};

ReactDOM.render(
  <Provider {...stores}>
    <Index />
  </Provider>,
  document.querySelector('#root'),
);
