import _ from 'lodash';

function getHighlightStyle(colors: Record<string, string>, annotators: string[] | string) {
  if (_.isString(annotators)) annotators = [annotators];
  if (annotators.length === 0) return '';
  annotators = _.uniq(annotators).sort();

  let style = 'background-image: linear-gradient(';
  if (annotators.length === 1) {
    const color = colors[annotators[0]];
    style += `transparent 0px, transparent 50%, ${color} 0px, ${color});`
    return style;
  }

  for (let i = 0; i < annotators.length; i++) {
    const annotator = annotators[i];
    const color = colors[annotator];
    style += `${color} 0px, ${color} ${(i + 1) * 100 / annotators.length}%`;
    if (annotators.indexOf(annotator) !== annotators.length - 1) {
      style += ',';
    } else {
      style += ');'
    }
  }
  return style;
}

export default getHighlightStyle;
