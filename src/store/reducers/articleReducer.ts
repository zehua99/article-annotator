import { ArticleStateType, ArticleType } from '../dataTypes';
import {
  ADD_ARTICLE, REMOVE_ARTICLE, UPDATE_CATEGORY_ARTICLE_LIST,
  ArticleActionType, LoadedArticleActionType, UpdateCategoryArticleListActionType,
} from '../actionTypes';

const defaultState: ArticleStateType = {
  loadedArticles: [],
  categoryToArticleIdListMap: {},
};

function articleReducer(state: ArticleStateType = defaultState, action: ArticleActionType) {
  let article: ArticleType;

  switch (action.type) {
    case ADD_ARTICLE:
      article = (action as LoadedArticleActionType).article;
      for (let i = 0; i < state.loadedArticles.length; i++) {
        if (state.loadedArticles[i].id === article.id &&
          state.loadedArticles[i].category === article.category) {
          return {
            ...state,
            loadedArticles: [
              ...state.loadedArticles.slice(0, i),
              article,
              ...state.loadedArticles.slice(i + 1),
            ],
          };
        }
      }
      return {
        ...state,
        loadedArticles: [...state.loadedArticles, article],
      };

    case REMOVE_ARTICLE:
      article = (action as LoadedArticleActionType).article;
      for (let i = 0; i < state.loadedArticles.length; i++) {
        if (state.loadedArticles[i] === article) {
          return {
            ...state,
            loadedArticles: [...state.loadedArticles.slice(0, i), ...state.loadedArticles.slice(i + 1)],
          };
        }
      }
      break;
    
    case UPDATE_CATEGORY_ARTICLE_LIST:
      const { category, articleIds } = action as UpdateCategoryArticleListActionType;
      return {
        ...state,
        categoryToArticleIdListMap: {
          ...state.categoryToArticleIdListMap,
          [category]: articleIds,
        },
      };
  }

  return state;
}

export default articleReducer;
