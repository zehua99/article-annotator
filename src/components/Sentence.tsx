import React from 'react';
import { connect } from 'react-redux';
import { StateType, ColorsType } from '../store/dataTypes';
import getColorClassName from '../utils/getColorClassName';
import createHighlightStyle from '../utils/createHighlightStyle';
import { getColorState } from '../store/selectors/colorSelector';

type SentenceProps = {
  sentence: string;
  annotators: string[];
  colors?: ColorsType;
}

const mapStateToProps = (state: StateType, ownProps: SentenceProps) => ({
  ...ownProps,
  colors: getColorState(state),
});

class Sentence extends React.Component<SentenceProps, {}> {
  render() {
    return (
      <span className={getColorClassName(this.props.annotators)}>
        {this.props.sentence}
        {createHighlightStyle(this.props.colors || {}, this.props.annotators)}
      </span>
    );
  }
}

export default connect(mapStateToProps)(Sentence);
