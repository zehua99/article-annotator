import React from 'react';
import { connect } from 'react-redux';
import { StateType, ColorsType } from '../store/dataTypes';
import { getAnnotatorColors } from '../store/selectors/colorSelector';
import addClass from '../utils/addClass';
import getColorClassName from '../utils/getColorClassName';
import getHighlightStyle from '../utils/getHighlightStyle';

type ColorLegendProps = {
  articleId: string;
  annotators: string[];
  colors?: ColorsType;
}

const mapStateToProps = (state: StateType, ownProps: ColorLegendProps) => ({
  ...ownProps,
  colors: getAnnotatorColors(state, ownProps.annotators),
});

class ColorLegend extends React.Component<ColorLegendProps, {}> {
  componentDidMount() {
    for (const annotator of this.props.annotators) {
      addClass(
        getColorClassName(annotator),
        getHighlightStyle({ ...this.props.colors }, annotator),
      );
    }
  }

  render() {
    return (
      <p className="legends">
        {this.props.annotators.map(annotator => (
          <span className={getColorClassName([annotator])}>
            {annotator}
          </span>
        ))}
      </p>
    );
  }
}

export default connect(mapStateToProps)(ColorLegend);
