import addClass from './addClass';
import getColorClassName from './getColorClassName';
import getHighlightStyle from './getHighlightStyle';
import { ColorsType } from '../store/dataTypes';

function createHighlightStyle(colors: ColorsType, annotators: string[] | string) {
  const className = getColorClassName(annotators);
  const highlightStyle = getHighlightStyle(colors, annotators);
  addClass(className, highlightStyle);
}

export default createHighlightStyle;
