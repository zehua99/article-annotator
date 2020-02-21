import React from 'react';
import './App.css';
import Article from './components/Article';
import QuestionCard from './components/QuestionCard';
import SentenceCard from './components/SentenceCard';

import data from './data';
const article = JSON.parse(data);

class App extends React.Component {
  render() {
    return (
      <div className="full-container">
        <Article article={article} />
        <div className="label-container">
          <QuestionCard
            question={article.question}
            explanation={article.explanation} />
          <h3>Annotating</h3>
          {(article.sentences as string[]).map((sentence, index) => (
            <SentenceCard
              sentence={sentence}
              checked={Math.random() > .5}
              key={`sentence-card-${index}`} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
