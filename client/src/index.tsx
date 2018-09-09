import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { loadData } from './actions/dataActions';
import App from './App';
import './index.css';
import configureStore from './store/configureStore';

const store: any = configureStore();
store.dispatch(loadData());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
