import { StateType, ColorsType } from '../dataTypes';

export const getColorState = (store: StateType) => store.colors;

export const getAnnotatorColors = (store: StateType, annotators: string[]) => {
  const colorState = getColorState(store);
  const colors: ColorsType = {};
  for (const annotator of annotators) {
    colors[annotator] = colorState[annotator];
  }
  return colors;
}
