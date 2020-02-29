import { StateType } from '../dataTypes';
import { getUsername } from './userSelector';
import { createSelector } from 'reselect';
import _ from 'lodash';

export const getAnnotationState = (store: StateType) => {
  return store.annotations;
}

export const getAnnotations = (articleId: number, category: string, sentenceIndex: number) => createSelector(
  getAnnotationState,
  annotations => annotations.filter(annotation => (
    annotation.category === category
    && annotation.sentenceIndex === sentenceIndex
    && annotation.articleId === articleId
  )),
);

export const isSentenceChecked = (articleId: number, category: string, sentenceIndex: number) => createSelector(
  getUsername,
  getAnnotations(articleId, category, sentenceIndex),
  (username, annotations) => {
    for (const annotation of annotations) {
      if (annotation.annotator === username)
        return true;
    }
    return false;
  }
);

export const getAnnotatedSentences = (articleId: number, category: string) => createSelector(
  getAnnotationState,
  annotations => {
    const anns = annotations.filter(a => a.articleId === articleId && a.category === category);
    return _.uniq(anns.map(annotation => annotation.sentenceIndex)).sort((a, b) => a - b);
  },
);

export const getAnnotators = (articleId: number, category: string, sentenceIndex: number) => createSelector(
  getAnnotations(articleId, category, sentenceIndex),
  annotations => annotations.map(annotation => annotation.annotator),
);
