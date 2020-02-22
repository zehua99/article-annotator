import React from 'react';
import { getColorClassName, createHighlightStyle } from '../utils';

type SentenceProps = {
  sentence: string;
  annotators: string[];
}

class Sentence extends React.Component<SentenceProps, {}> {
  render() {
    return (
      <span className={getColorClassName(this.props.annotators)}>
        {this.props.sentence}
        {createHighlightStyle(this.props.annotators)}
      </span>
    );
  }
}

export default Sentence;
