import React, { memo } from 'react';
import AppContainer from './Navigation';
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import reducer from './Reducers';
import sagas from './Sagas';

console.disableYellowBox = true;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    offline(offlineConfig)
  )
);
sagaMiddleware.run(sagas);

export default memo(() =>(
  <Provider store={store}>
    <AppContainer />
  </Provider>
));
