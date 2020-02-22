import { StateType } from '../dataTypes';
import { getUsername } from './userSelector';
import _ from 'lodash';

export const getAnnotationState = (store: StateType) => {
  return store.annotations;
}

export const getAnnotations = (store: StateType, articleId: number, category: string, sentenceIndex: number) => {
  const annotations = getAnnotationState(store);
  return annotations.filter(annotation => (
    annotation.category === category
    && annotation.sentenceIndex === sentenceIndex
    && annotation.articleId === articleId
  ));
}

export const isSentenceChecked = (store: StateType, articleId: number, category: string, sentenceIndex: number) => {
  const username = getUsername(store);
  const annotations = getAnnotations(store, articleId, category, sentenceIndex);
  return annotations.filter(annotation => annotation.annotator === username).length > 0;
}

export const getAnnotatedSentences = (store: StateType, articleId: number, category: string) => {
  const annotations = getAnnotationState(store).filter(a => a.articleId === articleId && a.category === category);
  const indices = annotations.map(annotation => annotation.sentenceIndex);
  return _.uniq(indices).sort((a, b) => a - b);
}

export const getAnnotators = (store: StateType, articleId: number, category: string, sentenceIndex: number) => {
  return getAnnotations(store, articleId, category, sentenceIndex).map(a => a.annotator);
}
