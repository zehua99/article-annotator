import { StateType } from '../dataTypes';
import { createSelector } from 'reselect';

export const getArticleState = (store: StateType) => {
  return store.articles;
}

export const getCategoryToArticleIdListMap = createSelector(
  getArticleState,
  state => state.categoryToArticleIdListMap,
);

export const getLoadedArticles = createSelector(
  getArticleState,
  state => state.loadedArticles,
);

export const getArticleIdList = (category: string) => createSelector(
  getCategoryToArticleIdListMap,
  map => map[category],
);

export const getLastArticleId = (articleId: number, category: string) => createSelector(
  getArticleIdList(category),
  list => {
    if (!list) return -1;
    const index = list.indexOf(articleId);
    if (index <= 0) return -1;
    return list[index - 1];
  },
);

export const getNextArticleId = (articleId: number, category: string) => createSelector(
  getArticleIdList(category),
  list => {
    if (!list) return -1;
    const index = list.indexOf(articleId);
    if (index < 0 || index + 1 === list.length) return -1;
    return list[index + 1];
  },
);

export const getArticle = (id: number, category: string) => createSelector(
  getLoadedArticles,
  articles => {
    for (const article of articles) {
      if (article.id === id && article.category === category) {
        return article;
      }
    }
    return undefined;
  }
);

export const getSentence = (articleId: number, category: string, sentenceIndex: number) => createSelector(
  getArticle(articleId, category),
  article => {
    if (article === undefined) return;
    return article.sentences[sentenceIndex];
  }
);
