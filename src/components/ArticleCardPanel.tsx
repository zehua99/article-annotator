import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { StateType, getArticleIdList } from '../store';
import { fetchArticleList } from '../socket';
import ArticleCard from './ArticleCard';

type ArticleCardPanelProps = {
  category: string,
}

const mapStateToProps = (state: StateType, props: ArticleCardPanelProps & RouteComponentProps) => ({
  articleIds: getArticleIdList((props.match.params as any).category)(state),
  category: (props.match.params as any).category,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsType = ArticleCardPanelProps & PropsFromRedux;

type ArticleCardPanelState = {
  maxArticleCount: number;
}

class ArticleCardPanel extends React.Component<PropsType, ArticleCardPanelState> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      maxArticleCount: 20,
    };
  }

  componentDidMount() {
    fetchArticleList(this.props.category);
  }

  handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    if (el.scrollTop + el.offsetHeight >= el.scrollHeight) {
      setTimeout(() => {
        this.setState(state => ({
          maxArticleCount: state.maxArticleCount + 20,
        }));
      }, 1000);
    }
  }

  render() {
    return (
      <div className="article-card-panel-container" onScroll={this.handleScroll}>
        {(this.props.articleIds || [])
          .slice(0, this.state.maxArticleCount)
          .map(articleId => (
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

export default withRouter(connector(ArticleCardPanel));
