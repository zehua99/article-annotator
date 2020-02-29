import React, { MouseEvent } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import scrollIntoView from 'scroll-into-view-if-needed';
import {
  StateType,
  getSentence, isSentenceChecked, getUsername, shouldSentenceScrollIntoView,
  ADD_ANNOTATION, REMOVE_ANNOTATION, CHANGE_SELECTED_TEXT,
} from '../store';
import socket from '../socket';

const section = 'ANNOTATION_SECTION';

const mapStateToProps = (state: StateType, props: SentenceCardProps) => ({
  sentence: getSentence(state, props.articleId, props.category, props.sentenceIndex),
  checked: isSentenceChecked(state, props.articleId, props.category, props.sentenceIndex),
  username: getUsername(state),
  shouldScrollIntoView: shouldSentenceScrollIntoView(
    state,
    props.articleId,
    props.category,
    props.sentenceIndex,
    section,
  ),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addAnnotation: (articleId: number, category: string, sentenceIndex: number, annotator: string) => {
    dispatch({
      type: ADD_ANNOTATION,
      annotation: {
        articleId, category, sentenceIndex, annotator,
      },
    });
  },
  removeAnnotation: (articleId: number, category: string, sentenceIndex: number, annotator: string) => {
    dispatch({
      type: REMOVE_ANNOTATION,
      annotation: {
        articleId, category, sentenceIndex, annotator,
      },
    });
  },
  changeSelectedText: (articleId: number, category: string, sentenceIndex: number) => {
    dispatch({
      type: CHANGE_SELECTED_TEXT,
      selectedText: {
        articleId,
        category,
        sentenceIndex,
        selectedIn: section,
      },
    });
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type SentenceCardProps = {
  articleId: number;
  category: string;
  sentenceIndex: number;
}

type PropsType = SentenceCardProps & PropsFromRedux;

class SentenceCard extends React.Component<PropsType, {}> {
  divRef = React.createRef<HTMLDivElement>();

  componentDidUpdate() {
    if (this.props.shouldScrollIntoView) {
      this.props.changeSelectedText(-1, '', -1);
      if (!this.divRef || !this.divRef.current) return;
      scrollIntoView(this.divRef.current, { behavior: 'smooth' });
      this.divRef.current.classList.add('selected-sentence-card');
      setTimeout(() => this.divRef.current?.classList.remove('selected-sentence-card'), 1500);
    }
  }

  handleClick = () => {
    if (!this.props.username) return;
    const { articleId, category, sentenceIndex, username } = this.props; 
    if (this.props.checked) {
      this.props.removeAnnotation(articleId, category, sentenceIndex, username);
    } else {
      this.props.addAnnotation(articleId, category, sentenceIndex, username);
    }
    socket.emit(
      this.props.checked ? 'remove annotation' : 'add annotation',
      { articleId, category, sentenceIndex, annotator: username },
    );
  }

  handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    const { articleId, category, sentenceIndex } = this.props;
    this.props.changeSelectedText(-1, '', -1);
    setTimeout(() => this.props.changeSelectedText(articleId, category, sentenceIndex), 0);
  }

  render() {
    return (
      <div
        ref={this.divRef}
        onClick={this.handleClick}
        onContextMenu={this.handleContextMenu}
        className={`sentence-card ${this.props.checked ? 'checked' : ''}`}>
        <p>{this.props.sentence}</p>
        <div className="side"></div>
      </div>
    )
  }
}

export default connector(SentenceCard);
