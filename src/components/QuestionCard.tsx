import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { StateType, getArticle } from '../store';

type QuestionCardProps = {
  articleId: number;
  category: string;
}

const mapStateToProps = (state: StateType, props: QuestionCardProps) => ({
  article: getArticle(state, props.articleId, props.category),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class QuestionCard extends React.Component<QuestionCardProps & PropsFromRedux, {}> {
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
