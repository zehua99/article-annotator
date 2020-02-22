import React from 'react';
import { createHighlightStyle, getColorClassName } from '../utils';

type ColorLegendProps = {
  articleId: string;
  annotators: string[];
}

class ColorLegend extends React.Component<ColorLegendProps, {}> {
  componentDidMount() {
    for (const annotator of this.props.annotators) {
      createHighlightStyle(annotator);
    }
  }

  render() {
    return (
      <p className="legends">
        {this.props.annotators.map(annotator => (
          <span className={getColorClassName([annotator])} key={annotator}>
            {annotator}
          </span>
        ))}
      </p>
    );
  }
}

export default ColorLegend;
