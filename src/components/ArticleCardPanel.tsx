import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { StateType, getArticleIdList } from '../store';
import ArticleCard from './ArticleCard';

type ArticleCardPanelProps = {
  category: string,
}

const mapStateToProps = (state: StateType, props: ArticleCardPanelProps) => ({
  articleIds: getArticleIdList(state, props.category),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class ArticleCardPanel extends React.Component<ArticleCardPanelProps & PropsFromRedux> {
  render() {
    return (
      <div className="article-card-panel-container">
        {(this.props.articleIds || []).slice(0, 40).map(articleId => (
          <ArticleCard
            category={this.props.category}
            articleId={articleId}
            key={`article-card-${articleId}`}
          />
        ))}
      </div>
    );
  }
}

export default connector(ArticleCardPanel);
