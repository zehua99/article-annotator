import { Action } from 'redux';
import { AnnotationType } from '../dataTypes';
import { ADD_ANNOTATION } from '../actionTypes';

function annotationReducer(state: AnnotationType[] = [], action: Action) {
  return [...state];
}

export default annotationReducer;
