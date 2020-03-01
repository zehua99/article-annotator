import { ADD_COLORS_TO_DOCUMENT, CHANGE_COLOR, ColorActionType } from '../actionTypes';
import { ColorsType } from '../dataTypes';

const defaultState: ColorsType = {
  annotatorToColorMap: {},
  annotatorToAnnotatorsMap: {},
  existingCombinations: [],
};

function colorReducer(state: ColorsType = defaultState, action: ColorActionType) {
  switch (action.type) {
    case CHANGE_COLOR:
      const { username, color } = action;
      return {
        ...state,
        annotatorToColorMap: {
          ...state.annotatorToColorMap,
          [username]: color,
        },
      };
    case ADD_COLORS_TO_DOCUMENT:
      if (!state.existingCombinations.includes(action.className)) {
        return {
          ...state,
          existingCombinations: [...state.existingCombinations, action.className],
        };
      }
  }
  return state;
}

export default colorReducer;
