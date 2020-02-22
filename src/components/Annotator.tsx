import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  StateType,
  getAnnotatedSentences, getUsername,
  ADD_ANNOTATION, REMOVE_ANNOTATION } from '../store';
import QuestionCard from './QuestionCard';
import SentenceCard from './SentenceCard';

type AnnotatorProps = {
  articleId: number,
  category: string,
  annotatedSentences?: number[],
  username?: string,
  addAnnotation?: (articleId: number, category: string, sentenceIndex: number, annotator: string) => void,
  removeAnnotation?: (articleId: number, category: string, sentenceIndex: number, annotator: string) => void,
}

const mapStateToProps = (state: StateType, props: AnnotatorProps) => ({
  annotatedSentences: getAnnotatedSentences(state, props.articleId, props.category),
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

class Annotator extends React.Component<AnnotatorProps, {}> {
  render() {
    return (
      <div className="annotator-container">
        <QuestionCard articleId={this.props.articleId} category={this.props.category} />
        <h3>Annotating</h3>
        {(this.props.annotatedSentences || []).map((sentenceIndex) => (
          <SentenceCard
            articleId={this.props.articleId}
            category={this.props.category}
            sentenceIndex={sentenceIndex}
            key={`sentence-card-${sentenceIndex}`} />
        ))}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Annotator);
