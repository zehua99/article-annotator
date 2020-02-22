import { ArticleType } from '../dataTypes';
import { ADD_ARTICLE, REMOVE_ARTICLE, ArticleActionType } from '../actionTypes';

function articleReducer(state: ArticleType[] = [], action: ArticleActionType) {
  const article = action.article;

  switch (action.type) {
    case ADD_ARTICLE:
      if (state.filter(a => (
        a.id === article.id && a.category === article.category
      )).length === 0) {
        return [...state, article];
      }
      break;
    case REMOVE_ARTICLE:
      for (let i = 0; i < state.length; i++) {
        if (state[i] === article) {
          return [...state.slice(0, i), ...state.slice(i + 1)];
        }
      }
      break;
  }

  return state;
}

export default articleReducer;
