import { StateType } from '../dataTypes';
import { createSelector } from 'reselect';

export const getColorState = (store: StateType) => store.colors;

export const getAllColors = createSelector(
  getColorState,
  state => state.annotatorToColorMap,
);

export const getAnnotatorColors = (annotators: string[]) => createSelector(
  getAllColors,
  colorState => {
    const colors: Record<string, string> = {};
    for (const annotator of annotators) {
      colors[annotator] = colorState[annotator];
    }
    return colors;
  },
);

export const getExistingCombinations = createSelector(
  getColorState,
  state => state.existingCombinations,
);

export const doesColorsExistInDocument = (className: string) => createSelector(
  getExistingCombinations,
  state => state.includes(className),
);
