import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { StateType, getSentence, getAnnotators, getUsername, addAnnotation, removeAnnotation } from '../store';
import { getColorClassName, createHighlightStyle } from '../utils';

type SentenceProps = {
  sentenceIndex: number;
  articleId: number;
  category: string;
  annotators?: string[];
  sentence?: string;
  username?: string;
  dispatch?: Dispatch;
}

const mapStateToProps = (state: StateType, props: SentenceProps) => ({
  ...props,
  sentence: getSentence(state, props.articleId, props.category, props.sentenceIndex),
  annotators: getAnnotators(state, props.articleId, props.category, props.sentenceIndex),
  username: getUsername(state),
});

class Sentence extends React.Component<SentenceProps, {}> {
  handleClick = () => {
    if (!this.props.annotators || !this.props.username) return;
    if (!this.props.dispatch) return;
    const { articleId, category, sentenceIndex, username } = this.props;
    if (this.props.annotators.includes(this.props.username)) {
      this.props.dispatch(removeAnnotation(articleId, category, sentenceIndex, username));
    } else {
      this.props.dispatch(addAnnotation(articleId, category, sentenceIndex, username));
    }
  }

  render() {
    return (
      <span
        onClick={this.handleClick}
        className={getColorClassName(this.props.annotators || [])}>
        {this.props.sentence}
        {createHighlightStyle(this.props.annotators || [])}
      </span>
    );
  }
}

export default connect(mapStateToProps)(Sentence);
