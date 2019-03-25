import React, { memo } from 'react';
import AppContainer from './Navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import reducer from './Reducers';

console.disableYellowBox = true;

const store = createStore(
  reducer,
  offline(offlineConfig)
);

export default memo(() =>(
  <Provider store={store}>
    <AppContainer />
  </Provider>
));
