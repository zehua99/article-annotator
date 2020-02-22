import {
  CHANGE_USERNAME,
  ChangeUsernameActionType,
  ADD_COLORS_TO_DOCUMENT,
  AddColorsToDocumentType,
  ADD_ANNOTATION,
  AddAnnotationActionType,
  REMOVE_ANNOTATION,
  RemoveAnnotationActionType,
} from './actionTypes';
import { ArticleType } from './dataTypes';

export function changeUsername(username: string): ChangeUsernameActionType {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}

export function addColorsToDocument(className: string): AddColorsToDocumentType {
  return {
    type: ADD_COLORS_TO_DOCUMENT,
    className,
  };
}

export function addAnnotation(
  articleId: number,
  category: string,
  sentenceIndex: number,
  annotator: string): AddAnnotationActionType {
  return {
    type: ADD_ANNOTATION,
    annotation: {
      articleId,
      category,
      sentenceIndex,
      annotator,
    }
  }
}

export function removeAnnotation(
  articleId: number,
  category: string,
  sentenceIndex: number,
  annotator: string): RemoveAnnotationActionType {
  return {
    type: REMOVE_ANNOTATION,
    annotation: {
      articleId,
      category,
      sentenceIndex,
      annotator,
    }
  }
}
