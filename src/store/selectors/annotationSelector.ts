import { StateType } from '../dataTypes';
import { getUsername } from './userSelector';
import { createSelector } from 'reselect';
import _ from 'lodash';

export const getAnnotationState = (store: StateType) => {
  return store.annotations;
}

export const getArticleAnnotations = (articleId: number, category: string) => createSelector(
  getAnnotationState,
  annotations => annotations.filter(annotation => (
    annotation.articleId === articleId
    && annotation.category === category
  )),
);

export const getAnnotations = (articleId: number, category: string, sentenceIndex: number) => createSelector(
  getArticleAnnotations(articleId, category),
  annotations => annotations.filter(annotation => annotation.sentenceIndex === sentenceIndex),
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
  getUsername,
  (annotations, username) => {
    const anns = annotations
      .filter(a => a.articleId === articleId && a.category === category)
      .sort((a, b) => {
        if ((a.annotator === username) !== (b.annotator === username))
          return a.annotator === username ? -1 : 1;
        if (a.rank !== b.rank)
          return (b.rank || 0) - (a.rank || 0);
        return a.sentenceIndex - b.sentenceIndex;
      })
      .map(a => a.sentenceIndex);
    return _.uniq(anns);
  },
);

export const getAnnotators = (articleId: number, category: string, sentenceIndex: number) => createSelector(
  getAnnotations(articleId, category, sentenceIndex),
  annotations => annotations.map(annotation => annotation.annotator),
);
