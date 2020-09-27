import {
  CHANGE_SELECTED_TEXT, SET_CURRENT_ARTICLE,
  DISPLAY_OTHERS_ANNOTATION, SET_CATEGORY_LIST,
  UtilityActionType, SetCurrentArticleActionType, SetCategoryListActionType,
} from '../actionTypes';
import { UtilityType } from '../dataTypes';

function utilityReducer(state: UtilityType = { categories: [] }, action: UtilityActionType) {
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
    case DISPLAY_OTHERS_ANNOTATION:
      return {
        ...state,
        displayOthersAnnotation: !state.displayOthersAnnotation,
      };
    case SET_CATEGORY_LIST:
      const setCategoryListAction = action as SetCategoryListActionType;
      return {
        ...state,
        categories: setCategoryListAction.categories,
      } as UtilityType;
  }
  return state;
}

export default utilityReducer;
