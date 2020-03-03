import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Article from './Article';

type ArticleCardProps = RouteComponentProps & {
  articleId: number,
  category: string,
  style?: any,
  shouldNotRenderInFull?: boolean,
}

type ArticleCardState = {
  hasRenderedInFull: boolean
}

class ArticleCard extends React.Component<ArticleCardProps, ArticleCardState> {
  constructor(props: ArticleCardProps) {
    super(props);
    this.state = { hasRenderedInFull: !this.props.shouldNotRenderInFull };
  }

  componentDidUpdate(props: ArticleCardProps) {
    if (this.state.hasRenderedInFull) return;
    if (!props.shouldNotRenderInFull) {
      this.setState({ hasRenderedInFull: true });
    }
  }

  handleClick = () => {
    this.props.history.push(`/${this.props.category}/${this.props.articleId}`);
  }

  render() {
    if (this.props.shouldNotRenderInFull && !this.state.hasRenderedInFull) {
      return (
        <div
          className="article-card-container"
          style={this.props.style}>
          <div className="article-container" style={{ backgroundColor: '#fff' }} />
          <span>Article {this.props.articleId}</span>
        </div>
      );
    }

    return (
      <div
        onClick={this.handleClick}
        className="article-card-container"
        style={this.props.style}>
        <Article {...this.props} displayOnly={true} />
        <div className="article-container-mask" />
        <span>Article {this.props.articleId}</span>
      </div>
    );
  }
}

export default withRouter(ArticleCard);
