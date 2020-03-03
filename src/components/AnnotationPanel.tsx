import React from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { GlobalHotKeys } from 'react-hotkeys';
import { hotKeyMap, hotKeyHandlers } from '../utils';
import { StateType, setCurrentArticle, getCurrentArticle, isUserLoggedIn } from '../store';
import { Article, Annotator } from '.';
import socket from '../socket';

const mapStateToProps = (state: StateType) => ({
  articleId: getCurrentArticle(state)?.articleId,
  category: getCurrentArticle(state)?.category,
  isUserLoggedIn: isUserLoggedIn(state),
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCurrentArticle: (articleId: number, category: string) => {
    dispatch(setCurrentArticle(articleId, category));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsType = RouteComponentProps & PropsFromRedux;

class AnnotationPanel extends React.Component<PropsType> {
  componentDidMount() {
    this.onRouteChanged();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.leaveArticle();
    const { match } = this.props;
    const articleId: number = +(match.params as any)['articleId'];
    const category: string = (match.params as any)['category'];
    this.props.setCurrentArticle(articleId, category);
    socket.emit('join article', { articleId, category });
    window.scrollTo(0, 0);
  }

  leaveArticle() {
    if (this.props.articleId && this.props.category) {
      const { articleId, category } = this.props;
      socket.emit('leave article', { articleId, category });
    }
  }

  render() {
    if (!this.props.articleId || !this.props.category)
      return <div className="annotation-panel-container" />;
    const { articleId, category } = this.props;
    return (
      <div className="annotation-panel-container">
        <Article articleId={articleId} category={category} />
        <Annotator articleId={articleId} category={category} />
        <GlobalHotKeys keyMap={hotKeyMap} handlers={hotKeyHandlers} />
      </div>
    );
  }
}

export default withRouter(connector(AnnotationPanel));
