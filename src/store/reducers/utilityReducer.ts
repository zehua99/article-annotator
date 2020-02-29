import {
  CHANGE_SELECTED_TEXT, SET_CURRENT_ARTICLE,
  UtilityActionType, SetCurrentArticleActionType,
} from '../actionTypes';
import { UtilityType } from '../dataTypes';

function utilityReducer(state: UtilityType = {}, action: UtilityActionType) {
  switch (action.type) {
    case CHANGE_SELECTED_TEXT:
      return {
        ...state,
        selectedSentence: action.selectedText,
      };
    case SET_CURRENT_ARTICLE:
      const setCurrentArticleAction = action as SetCurrentArticleActionType;
      const { articleId, category } = setCurrentArticleAction;
      return {
        ...state,
        currentArticle: { articleId, category },
      };
  }
  return state;
}

export default utilityReducer;
