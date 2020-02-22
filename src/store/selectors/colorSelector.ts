import { StateType } from '../dataTypes';

export const getColorState = (store: StateType) => store.colors;

export const getAllColors = (store: StateType) => {
  const colors = getColorState(store);
  return colors.annotatorToColorMap;
}

export const getAnnotatorColors = (store: StateType, annotators: string[]) => {
  const colorState = getAllColors(store);
  const colors: Record<string, string> = {};
  for (const annotator of annotators) {
    colors[annotator] = colorState[annotator];
  }
  return colors;
}

export const getExistingCombinations = (store: StateType) => {
  return getColorState(store).existingCombinations;
}

export const doesColorsExistInDocument = (store: StateType, className: string) => {
  const state = getExistingCombinations(store);
  return state.includes(className);
}
