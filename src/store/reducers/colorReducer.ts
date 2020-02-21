import { Action } from 'redux';
import { CHANGE_COLOR } from '../actionTypes';

function colorReducer(state: Record<string, string> = {}, action: Action) {
  return { ...state };
}

export default colorReducer;
