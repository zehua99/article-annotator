import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StateType } from './dataTypes';
import userReducer from './reducers/userReducer';
import annotationReducer from './reducers/annotationReducer';
import articleReducer from './reducers/articleReducer';
import colorReducer from './reducers/colorReducer';
import utilityReducer from './reducers/utilityReducer';
import Cookies from 'js-cookie';

export * from './dataTypes';
export * from './actionTypes';
export * from './actions';
export * from './selectors';
export * from './reducers';

const initialState: StateType = {
  username: Cookies.get('username'),
  colors: {
    annotatorToColorMap: {},
    annotatorToAnnotatorsMap: {},
    existingCombinations: [],
  },
  articles: {
    categoryToArticleIdListMap: {},
    loadedArticles: [],
  },
  annotations: [],
  utils: {
    categories: [],
  },
};

const reducer = combineReducers({
  username: userReducer,
  annotations: annotationReducer,
  articles: articleReducer,
  colors: colorReducer,
  utils: utilityReducer,
});

export default createStore(reducer, initialState, applyMiddleware(thunk));
