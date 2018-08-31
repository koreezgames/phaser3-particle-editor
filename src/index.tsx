import { Provider } from 'mobx-react';
import 'phaser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Index from './pages/index';
import { editorStore, emitterStore } from './stores';

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
