import { StateType } from '../dataTypes';

export const getArticleState = (store: StateType) => {
  return store.articles;
}

export const getArticleIdList = (store: StateType, category: string) => {
  return getArticleState(store).categoryToArticleIdListMap[category];
}

export const getLastArticleId = (store: StateType, articleId: number, category: string) => {
  const list = getArticleIdList(store, category);
  if (!list) return -1;
  const index = list.indexOf(articleId);
  if (index <= 0) return -1;
  return list[index - 1];
}

export const getNextArticleId = (store: StateType, articleId: number, category: string) => {
  const list = getArticleIdList(store, category);
  if (!list) return -1;
  const index = list.indexOf(articleId);
  if (index < 0 || index + 1 === list.length) return -1;
  return list[index + 1];
}

export const getArticle = (store: StateType, id: number, category: string) => {
  const articles = getArticleState(store).loadedArticles;
  const article = articles.filter(article => article.id === id && article.category === category);
  if (article.length > 0) return article[0];
  return undefined;
}

export const getSentence = (store: StateType, articleId: number, category: string, sentenceIndex: number) => {
  const article = getArticle(store, articleId, category);
  if (article === undefined) return;
  return article.sentences[sentenceIndex];
}
