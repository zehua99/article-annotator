import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  StateType,
  getSentence, isSentenceChecked, getUsername,
  ADD_ANNOTATION, REMOVE_ANNOTATION,
} from '../store';

type SentenceCardProps = {
  articleId: number;
  category: string;
  sentenceIndex: number;
  sentence?: string;
  checked?: boolean;
  username?: string;
  addAnnotation?: (articleId: number, category: string, sentenceIndex: number, annotator: string) => void;
  removeAnnotation?: (articleId: number, category: string, sentenceIndex: number, annotator: string) => void;
}

const mapStateToProps = (state: StateType, props: SentenceCardProps) => ({
  sentence: getSentence(state, props.articleId, props.category, props.sentenceIndex),
  checked: isSentenceChecked(state, props.articleId, props.category, props.sentenceIndex),
  username: getUsername(state),
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
  }
});

class SentenceCard extends React.Component<SentenceCardProps, {}> {
  handleClick = () => {
    if (!this.props.addAnnotation || !this.props.removeAnnotation) return;
    if (!this.props.username) return;
    const { articleId, category, sentenceIndex, username } = this.props; 
    if (this.props.checked) {
      this.props.removeAnnotation(articleId, category, sentenceIndex, username);
    } else {
      this.props.addAnnotation(articleId, category, sentenceIndex, username);
    }
  }

  render() {
    return (
      <div
        onClick={this.handleClick}
        className={`sentence-card ${this.props.checked ? 'checked' : ''}`}>
        <p>{this.props.sentence}</p>
        <div className="side"></div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SentenceCard);
