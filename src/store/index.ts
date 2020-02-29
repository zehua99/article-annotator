import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StateType } from './dataTypes';
import userReducer from './reducers/userReducer';
import annotationReducer from './reducers/annotationReducer';
import articleReducer from './reducers/articleReducer';
import colorReducer from './reducers/colorReducer';
import utilityReducer from './reducers/utilityReducer';

export * from './dataTypes';
export * from './actionTypes';
export * from './actions';
export * from './selectors';
export * from './reducers';

const colors = [
  'rgb(255, 227, 134)',
  'rgb(141, 195, 234)',
  'rgb(215, 186, 229)',
  'rgb(169, 222, 204)',
];

const defaultColors = {
  'Quotes': colors[0],
  'XLNet': colors[1],
  'BERT Embedding': colors[2],
  'Ash’s Annotation': colors[3],
};

const initialState: StateType = {
  username: 'Ash’s Annotation',
  colors: {
    annotatorToColorMap: defaultColors,
    annotatorToAnnotatorsMap: {},
    existingCombinations: [],
  },
  articles: {
    categoryToArticleIdListMap: {},
    loadedArticles: [],
  },
  annotations: [],
  utils: {},
};

const reducer = combineReducers({
  username: userReducer,
  annotations: annotationReducer,
  articles: articleReducer,
  colors: colorReducer,
  utils: utilityReducer,
})

export default createStore(reducer, initialState, applyMiddleware(thunk));
