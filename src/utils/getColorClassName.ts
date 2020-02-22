import _ from 'lodash';

function getAlphabeticString(input: string) {
  let str = '';
  for (let i = 0; i < input.length; i++) {
    if (input[i] >= 'a' && input[i] <= 'z') str += input[i];
    else if (input[i] >= 'A' && input[i] <= 'Z') str += input[i];
    else {
      let encoded = encodeURIComponent(input[i]);
      while (encoded.indexOf('%') >= 0) {
        encoded = encoded.replace('%', '---');
      }
      str += encoded;
    }
  }
  return str;
}

function getColorClassName(annotators: string[] | string) {
  if (_.isString(annotators)) annotators = [annotators];
  if (annotators.length === 0) return '';
  annotators = _.uniq(annotators).sort();
  return `highlight-${annotators.map(getAlphabeticString).join('-')}`;
}

export default getColorClassName;
