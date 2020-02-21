import { Action } from 'redux';
import { ArticleType } from '../dataTypes';
import { ADD_ARTICLE } from '../actionTypes';

function articleReducer(state: ArticleType[] = [], action: Action) {
  return [...state];
}

export default articleReducer;
