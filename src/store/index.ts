import { createStore, combineReducers } from 'redux';
import { StateType } from './dataTypes';
import userReducer from './reducers/userReducer';
import annotationReducer from './reducers/annotationReducer';
import articleReducer from './reducers/articleReducer';
import colorReducer from './reducers/colorReducer';

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
  username: '',
  colors: defaultColors,
  articles: [],
  annotations: [],
};

const reducer = combineReducers({
  username: userReducer,
  annotations: annotationReducer,
  articles: articleReducer,
  colors: colorReducer,
})

export default createStore(reducer, initialState);
