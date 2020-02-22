import { AnnotationType } from '../dataTypes';
import { ADD_ANNOTATION, REMOVE_ANNOTATION, AnnotationActionType } from '../actionTypes';
import _ from 'lodash';

function annotationReducer(state: AnnotationType[] = [], action: AnnotationActionType) {
  switch (action.type) {
    case ADD_ANNOTATION:
      for (let i = 0; i < state.length; i++) {
        if (_.isEqual(action.annotation, state[i])) return state;
      }
      return [...state, action.annotation];

    case REMOVE_ANNOTATION:
      for (let i = 0; i < state.length; i++) {
        if (_.isEqual(action.annotation, state[i])) {
          return [...state.slice(0, i), ...state.slice(i + 1)];
        }
      }
  }
  return state;
}

export default annotationReducer;
