import { StateType } from '../dataTypes';

export const getArticleState = (store: StateType) => {
  return store.articles;
}

export const getArticle = (store: StateType, id: number, category: string) => {
  const articles = getArticleState(store);
  const article = articles.filter(article => article.id === id && article.category === category);
  if (article.length > 0) return article[0];
  return undefined;
}

export const getSentence = (store: StateType, articleId: number, category: string, sentenceIndex: number) => {
  const article = getArticle(store, articleId, category);
  if (article === undefined) return;
  return article.sentences[sentenceIndex];
}
