import React from 'react';
import './App.css';
import { Article, Annotator } from './components';

class App extends React.Component {
  render() {
    return (
      <div className="full-container">
        <Article articleId={1} category="Question 1" />
        <Annotator articleId={1} category="Question 1" />
      </div>
    );
  }
}

export default App;
