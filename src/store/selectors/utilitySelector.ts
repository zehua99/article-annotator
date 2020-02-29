import { StateType } from '../dataTypes';

export const getUtilityState = (store: StateType) => {
  return store.utils;
}

export const getCurrentArticle = (store: StateType) => {
  return getUtilityState(store).currentArticle;
}

export const getSelectedSentence = (store: StateType) => {
  return getUtilityState(store).selectedSentence;
}

export const shouldSentenceScrollIntoView = (
  store: StateType,
  articleId: number,
  category: string,
  sentenceIndex: number,
  sentenceIn: 'ARTICLE_SECTION' | 'ANNOTATION_SECTION'
) => {
  const utils = getUtilityState(store);
  if (!utils.selectedSentence) return false;
  const { selectedSentence } = utils;
  return selectedSentence.articleId === articleId
    && selectedSentence.sentenceIndex === sentenceIndex
    && selectedSentence.category === category
    && sentenceIn !== selectedSentence.selectedIn;
}
