import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { StateType, isUserLoggedIn } from './store';
import './App.css';
import { AnnotationPanel, ArticleCardPanel, SetUsername } from './components'

const mapStateToProps = (state: StateType) => ({
  isUserLoggedIn: isUserLoggedIn(state),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFromRedux> {
  render() {
    if (!this.props.isUserLoggedIn) {
      return <SetUsername />;
    }

    return (
      <Router basename='/article-annotator'>
        <Switch>
          <Route path="/:category/:articleId">
            <AnnotationPanel />
          </Route>
          <Route path="/:category">
            <ArticleCardPanel category="Question 1" />
          </Route>
          <Route path="/">
            <Redirect to="/Question 1" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default connector(App);
