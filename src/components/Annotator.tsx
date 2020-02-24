import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { StateType, getAnnotatedSentences } from '../store';
import QuestionCard from './QuestionCard';
import SentenceCard from './SentenceCard';

type AnnotatorProps = {
  articleId: number,
  category: string,
}

const mapStateToProps = (state: StateType, props: AnnotatorProps) => ({
  annotatedSentences: getAnnotatedSentences(state, props.articleId, props.category),
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class Annotator extends React.Component<AnnotatorProps & PropsFromRedux, {}> {
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{
            marginTop: '1rem',
            marginBottom: '4rem',
            padding: '.5rem 2rem .5rem 1rem',
            cursor: 'pointer',
            backgroundColor: 'rgba(233, 212, 96, 1)',
            borderBottomLeftRadius: '.5rem',
            borderTopLeftRadius: '.5rem',
            marginRight: '-2rem',
            fontSize: '1rem',
          }}>
            Submit Annotation ▶︎
          </span>
        </div>
      </div>
    )
  }
}

export default connector(Annotator);
