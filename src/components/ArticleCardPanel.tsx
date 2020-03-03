import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AutoSizer, Grid, GridCellRenderer } from 'react-virtualized';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { StateType, getArticleIdList, getCurrentArticle } from '../store';
import { fetchArticleList } from '../socket';
import ArticleCard from './ArticleCard';

type ArticleCardPanelProps = {
  category: string,
}

const mapStateToProps = (state: StateType, props: ArticleCardPanelProps & RouteComponentProps) => ({
  articleIds: getArticleIdList((props.match.params as any).category)(state),
  category: (props.match.params as any).category,
  currentArticle: getCurrentArticle(state),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsType = ArticleCardPanelProps & PropsFromRedux;

const elementHeight = 360;
const elementWidth = 240;

class ArticleCardPanel extends React.Component<PropsType> {
  ref = React.createRef<HTMLDivElement>();
  columnCount = 0;

  componentDidMount() {
    fetchArticleList(this.props.category);
    setTimeout(() => {
      if (this.props.currentArticle && this.props.category === this.props.currentArticle.category) {
        if (this.ref && this.ref.current && this.ref.current.parentElement) {
          const parent = this.ref.current.parentElement.parentElement;
          if (parent === null) return;
          const index = this.props.articleIds.indexOf(this.props.currentArticle.articleId);
          parent.scrollTo(0, Math.floor(index / this.columnCount) * elementHeight - 100);
        }
      }
    }, 0);
  }

  getArticleCard: GridCellRenderer = ({ columnIndex, rowIndex, style, key, parent, isVisible }) => {
    const index = columnIndex + rowIndex * this.columnCount;
    if (index >= this.props.articleIds.length) {
      return <div style={style} key={key} />;
    }
    const articleId = this.props.articleIds[index];

    return (
      <div key={key} ref={this.ref} style={{
        ...style,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
        <ArticleCard
          category={this.props.category}
          articleId={articleId}
          shouldNotRenderInFull={!isVisible}
          style={{ width: '12rem' }} />
      </div>
    );
  };

  render() {
    return (
      <AutoSizer>
        {({ height, width }) => {
          this.columnCount = Math.floor(width / elementWidth);
          return (
            <Grid
              className="article-card-panel-container"
              cellRenderer={this.getArticleCard.bind(this)}
              width={width}
              height={height}
              columnWidth={(width - 32) / this.columnCount}
              columnCount={this.columnCount}
              rowHeight={elementHeight}
              rowCount={Math.ceil((this.props.articleIds || []).length / this.columnCount)} />
          );
        }}
      </AutoSizer>
    );
  }
}

export default withRouter(connector(ArticleCardPanel));
