import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Redirect,
} from 'react-router-dom';
import './App.css';
import { AnnotationPanel, ArticleCardPanel } from './components'

class App extends React.Component {
  render() {
    return (
      <Router>
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

export default App;
