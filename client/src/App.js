import React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {ConnectedRouter} from 'connected-react-router';
import store, {history} from './store';
import Routers from './routes';
import theme from './styles/Theme';
import GlobalStyle from './styles/Global';
import {USER_LOADING_REQUEST} from './redux/types';

function App() {
  try {
    store.dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  } catch (e) {
    console.log(e);
  }
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
        <Routers/>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;