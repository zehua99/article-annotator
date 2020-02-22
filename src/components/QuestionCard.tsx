import React from 'react';
import { connect } from 'react-redux';
import { StateType, ArticleType, getArticle } from '../store';

type QuestionCardProps = {
  articleId: number;
  category: string;
  article?: ArticleType;
}

const mapStateToProps = (state: StateType, props: QuestionCardProps) => ({
  article: getArticle(state, props.articleId, props.category),
});

class QuestionCard extends React.Component<QuestionCardProps, {}> {
  render() {
    if (!this.props.article) return <div />;
    const { question, explanation } = this.props.article;
    return (
      <p className="explanation">
        <b><i>{question}</i></b><br />
        {explanation}
      </p>
    );
  }
}

export default connect(mapStateToProps)(QuestionCard);
