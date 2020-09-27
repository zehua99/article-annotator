import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Switch, Route, withRouter, RouteComponentProps } from 'react-router-dom';
import store, { StateType, isUserLoggedIn, getUsername, DISPLAY_OTHERS_ANNOTATION } from './store';
import { AnnotationPanel, ArticleCardPanel, CategoryPanel, SetUsername } from './components'
import { createHighlightStyle } from './utils';

declare global {
  interface Window { displayOthersAnnotation: () => void; }
}

window.displayOthersAnnotation = () => {
  store.dispatch({
    type: DISPLAY_OTHERS_ANNOTATION,
  });
}

const mapStateToProps = (state: StateType) => ({
  isUserLoggedIn: isUserLoggedIn(state),
  username: getUsername(state),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFromRedux & RouteComponentProps> {
  componentDidMount() {
    if (this.props.isUserLoggedIn && this.props.username) {
      createHighlightStyle(this.props.username);
    }
  }

  render() {
    if (!this.props.isUserLoggedIn) {
      return <SetUsername />;
    }

    return (
      <Switch>
        <Route path="/:category/:articleId" component={AnnotationPanel} />
        <Route path="/:category" component={ArticleCardPanel} />
        <Route path="/" component={CategoryPanel} />
      </Switch>
    );
  }
}

export default withRouter(connector(App));
