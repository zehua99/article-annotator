import addClass from './addClass';
import getColorClassName from './getColorClassName';
import getHighlightStyle from './getHighlightStyle';
import store, { addColorsToDocument, doesColorsExistInDocument, getAllColors } from '../store';

function createHighlightStyle(annotators: string[] | string) {
  const className = getColorClassName(annotators);
  if (doesColorsExistInDocument(store.getState(), className)) return;
  const highlightStyle = getHighlightStyle(getAllColors(store.getState()), annotators);
  addClass(className, highlightStyle);
  store.dispatch(addColorsToDocument(className));
}

export default createHighlightStyle;
