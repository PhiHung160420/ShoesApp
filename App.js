import React from 'react';
import {Provider} from 'react-redux';
import RootNavigator from './src/navigations/rootNavigator';
import store from './src/redux/stores/store';

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
