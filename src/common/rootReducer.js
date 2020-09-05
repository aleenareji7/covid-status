import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';

const reducerMap = {
  router: routerReducer,
  home: homeReducer,
  common: commonReducer,
};

export default combineReducers(reducerMap);
