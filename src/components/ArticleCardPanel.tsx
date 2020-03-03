import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AutoSizer, Grid, GridCellRenderer } from 'react-virtualized';
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

class ArticleCardPanel extends React.Component<PropsType> {
  componentDidMount() {
    fetchArticleList(this.props.category);
  }

  getArticleCard: GridCellRenderer = ({ columnIndex, rowIndex, style, key, isScrolling, parent }) => {
    const columnCount = Math.floor(parent.props.width / 240);
    const index = columnIndex + rowIndex * columnCount;
    if (index >= this.props.articleIds.length) {
      return <div style={style} key={key} />;
    }
    const articleId = this.props.articleIds[index];

    return (
      <div key={key} style={{ ...style, display: 'flex', justifyContent: 'center'}}>
        <ArticleCard
          category={this.props.category}
          articleId={articleId}
          shouldNotRenderInFull={isScrolling}
          style={{ width: '12rem' }} />
      </div>
    );
  };

  render() {
    return (
      <AutoSizer>
        {({ height, width }) => {
          const columnCount = Math.floor(width / 240);
          return (
            <Grid
              className="article-card-panel-container"
              cellRenderer={this.getArticleCard.bind(this)}
              width={width}
              height={height}
              columnWidth={(width - 32) / columnCount}
              columnCount={columnCount}
              rowHeight={360}
              rowCount={Math.ceil((this.props.articleIds || []).length / columnCount)} />
          );
        }}
      </AutoSizer>
    );
  }
}

export default withRouter(connector(ArticleCardPanel));
