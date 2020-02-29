import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { StateType, getAnnotatedSentences, getLastArticleId, getNextArticleId } from '../store';
import QuestionCard from './QuestionCard';
import SentenceCard from './SentenceCard';

type AnnotatorProps = {
  articleId: number,
  category: string,
}

const mapStateToProps = (state: StateType, props: AnnotatorProps) => ({
  annotatedSentences: getAnnotatedSentences(state, props.articleId, props.category),
  lastArticleId: getLastArticleId(state, props.articleId, props.category),
  nextArticleId: getNextArticleId(state, props.articleId, props.category),
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsType = AnnotatorProps & PropsFromRedux & RouteComponentProps;

class Annotator extends React.Component<PropsType, {}> {
  goToLastArticle = () => {
    const { category, history, lastArticleId } = this.props;
    if (lastArticleId < 0) return;
    history.push(`/${category}/${lastArticleId}`);
  }

  goToNextArticle = () => {
    const { category, history, nextArticleId } = this.props;
    if (nextArticleId < 0) return;
    history.push(`/${category}/${nextArticleId}`);
  }

  render() {
    return (
      <div className="annotator-container">
        <QuestionCard articleId={this.props.articleId} category={this.props.category} />
        <h3>Select sentences that are relative to the question.</h3>
        {(this.props.annotatedSentences || []).map((sentenceIndex) => (
          <SentenceCard
            articleId={this.props.articleId}
            category={this.props.category}
            sentenceIndex={sentenceIndex}
            key={`sentence-card-${sentenceIndex}`} />
        ))}
        <div className="last-next-buttons">
          {(this.props.lastArticleId < 0 ||
            <span
              onClick={this.goToLastArticle}
              className="last-article-button"
            >
              Last Article
            </span>)}
          {(this.props.nextArticleId < 0 ||
            <span
              onClick={this.goToNextArticle}
              className="next-article-button"
            >
              Next Article
            </span>)}
        </div>
      </div>
    );
  }
}

export default withRouter(connector(Annotator));
