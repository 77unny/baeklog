import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import store, {history} from './store';
import Routers from './routes';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routers/>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;