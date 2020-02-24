import { CHANGE_SELECTED_TEXT, UtilityActionType } from '../actionTypes';
import { UtilityType } from '../dataTypes';

function utilityReducer(state: UtilityType = {}, action: UtilityActionType) {
  switch (action.type) {
    case CHANGE_SELECTED_TEXT:
      return {
        ...state,
        selectedSentence: action.selectedText,
      };
  }
  return state;
}

export default utilityReducer;
