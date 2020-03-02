import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { StateType, isUserLoggedIn } from './store';
import './App.css';
import { AnnotationPanel, ArticleCardPanel, SetUsername } from './components'

const mapStateToProps = (state: StateType) => ({
  isUserLoggedIn: isUserLoggedIn(state),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class App extends React.Component<PropsFromRedux & RouteComponentProps> {
  render() {
    if (!this.props.isUserLoggedIn) {
      return <SetUsername />;
    }

    return (
      <Switch>
        <Route path="/:category/:articleId" component={AnnotationPanel} />
        <Route path="/:category" component={ArticleCardPanel} />
        <Route path="/">
          <Redirect to="/Question 1 test" />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(connector(App));
