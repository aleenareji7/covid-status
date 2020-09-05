import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import history from './history';
import rootReducer from './rootReducer';

const router = routerMiddleware(history);
const middlewares = [thunk, router];

let devToolsExtension = f => f;

if (process.env.NODE_ENV === 'development') {
  if (window.devToolsExtension) {
    devToolsExtension = window.devToolsExtension();
  }
}

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      devToolsExtension,
    ),
  );

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
