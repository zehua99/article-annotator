import React, { MouseEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import scrollIntoView from 'scroll-into-view-if-needed';
import {
  StateType,
  getSentence, getAnnotators, getUsername, addAnnotation, removeAnnotation,
  shouldSentenceScrollIntoView, CHANGE_SELECTED_TEXT, ChangeSelectedTextActionType,
} from '../store';
import { getColorClassName, createHighlightStyle } from '../utils';

type SentenceProps = {
  sentenceIndex: number;
  articleId: number;
  category: string;
}

const section = 'ARTICLE_SECTION';

const mapStateToProps = (state: StateType, props: SentenceProps) => ({
  sentence: getSentence(state, props.articleId, props.category, props.sentenceIndex),
  annotators: getAnnotators(state, props.articleId, props.category, props.sentenceIndex),
  username: getUsername(state),
  shouldScrollIntoView: shouldSentenceScrollIntoView(
    state,
    props.articleId,
    props.category,
    props.sentenceIndex,
    section,
  ),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Sentence extends React.Component<SentenceProps & PropsFromRedux, {}> {
  ref = React.createRef<HTMLSpanElement>();

  componentDidUpdate() {
    if (this.props.shouldScrollIntoView) {
      this.props.dispatch({
        type: CHANGE_SELECTED_TEXT,
        selectedText: { articleId: -1, category: '', sentenceIndex: -1, selectedIn: section },
      } as ChangeSelectedTextActionType);
      if (!this.ref || !this.ref.current) return;
      scrollIntoView(this.ref.current, { behavior: 'smooth' });
      this.ref.current.classList.add('selected-sentence');
      setTimeout(() => this.ref.current?.classList.remove('selected-sentence'), 1500);
    }
  }

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

  handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    const { articleId, category, sentenceIndex } = this.props;
    this.props.dispatch({
      type: CHANGE_SELECTED_TEXT,
      selectedText: { articleId: -1, category: '', sentenceIndex: -1, selectedIn: section },
    } as ChangeSelectedTextActionType);
    setTimeout(() => {
      this.props.dispatch({
        type: CHANGE_SELECTED_TEXT,
        selectedText: { articleId, category, sentenceIndex, selectedIn: section },
      } as ChangeSelectedTextActionType);
    }, 0);
    if (this.props.annotators.length === 0) {
      this.ref.current?.parentElement?.parentElement?.classList.add('shakey-sentence');
      setTimeout(() => {
        this.ref.current?.parentElement?.parentElement?.classList.remove('shakey-sentence');
      }, 1000);
    }
  }

  render() {
    return (
      <span
        ref={this.ref}
        onClick={this.handleClick}
        onContextMenu={this.handleContextMenu}
        className={getColorClassName(this.props.annotators || [])}>
        {this.props.sentence}
        {createHighlightStyle(this.props.annotators || [])}
      </span>
    );
  }
}

export default connector(Sentence);
