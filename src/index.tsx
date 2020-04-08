import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from 'store';
import UINav from 'components/shared/UINav';
import { UIFooter } from 'components/shared/UIFooter';
import UIError from 'components/shared/UIError';
import App from 'components/App';


const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <>
        <UIError/>
        <UINav/>
        <App/>
        <UIFooter/>
      </>
    </Router>
  </Provider>
  ,
  document.getElementById('root'),
);
//
