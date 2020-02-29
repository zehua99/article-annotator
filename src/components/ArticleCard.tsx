import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Article from './Article';

type ArticleCardProps = RouteComponentProps & {
  articleId: number,
  category: string,
}

class ArticleCard extends React.Component<ArticleCardProps> {
  handleClick = () => {
    this.props.history.push(`/${this.props.category}/${this.props.articleId}`);
  }

  render() {
    return (
      <div
        onClick={this.handleClick}
        className="article-card-container">
        <Article {...this.props} displayOnly={true} />
        <div className="article-container-mask" />
        <span>Article {this.props.articleId}</span>
      </div>
    );
  }
}

export default withRouter(ArticleCard);
