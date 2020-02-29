import { AnnotationType } from '../dataTypes';
import {
  ADD_ANNOTATION, REMOVE_ANNOTATION, UPDATE_ANNOTATION_RANK,
  AnnotationActionType,
} from '../actionTypes';

function areAnnotationsEqual(a: AnnotationType, b: AnnotationType) {
  return a.articleId === b.articleId
    && a.sentenceIndex === b.sentenceIndex
    && a.annotator === b.annotator
    && a.category === b.category;
}

function annotationReducer(state: AnnotationType[] = [], action: AnnotationActionType) {
  switch (action.type) {
    case ADD_ANNOTATION:
      for (let i = 0; i < state.length; i++) {
        if (areAnnotationsEqual(action.annotation, state[i])) return state;
      }
      return [...state, action.annotation];

    case REMOVE_ANNOTATION:
      for (let i = 0; i < state.length; i++) {
        if (areAnnotationsEqual(action.annotation, state[i])) {
          return [...state.slice(0, i), ...state.slice(i + 1)];
        }
      }
      break;
    case UPDATE_ANNOTATION_RANK:
      const { annotation } = action;
      for (let i = 0; i < state.length; i++) {
        if (areAnnotationsEqual(annotation, state[i])) {
          return [...state.slice(0, i), annotation, ...state.slice(i + 1)];
        }
      }
      break;
  }
  return state;
}

export default annotationReducer;
