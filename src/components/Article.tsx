import React from 'react';
import { connect } from 'react-redux';
import { StateType, ColorsType } from '../store/dataTypes';
import ColorLegend from './ColorLegend';
import Sentence from './Sentence';
import { getColorState } from '../store/selectors/colorSelector';

type ArticleProps = {
  article: {
    title?: string;
    paragraphs: string[];
    sentences: string[];
    annotations: any[];
  };
  colors?: ColorsType;
}

const mapStateToProps = (state: StateType, ownProps: ArticleProps) => ({
  ...ownProps,
  colors: getColorState(state),
});

class Article extends React.Component<ArticleProps, {}> {
  getParagraph(paragraph: string, key: string) {
    let temp = paragraph.trim();
    let start = -1;
    let end = -1;
    for (let i = 0; i < this.props.article.sentences.length; i++) {
      if (temp.startsWith(this.props.article.sentences[i])) {
        temp = temp.slice(this.props.article.sentences[i].length).trim();
        if (start === -1) start = i;
        if (temp.length === 0) {
          end = i;
          break;
        }
      } else {
        start = -1;
        temp = paragraph.trim();
      }
    }

    const sentences: number[] = [];
    for (let i = start; i <= end; i++) sentences.push(i);

    const getRandomColor = () => {
      const annotators: string[] = [];
      for (let i = 0; i < Object.keys(this.props.colors || {}).length; i++) {
        if (Math.random() > .8) {
          annotators.push(Object.keys(this.props.colors || {})[i]);
        }
      }
      return annotators;
    }

    return (
      <p key={key}>
        {start === -1
        ? <span>
            <Sentence sentence={paragraph} annotators={getRandomColor()} />
          </span>
        : sentences.map((index) => (
          <span key={`sentence-${index}`}>
            <Sentence sentence={this.props.article.sentences[index]} annotators={getRandomColor()}/>
            {' '}
          </span>
        ))}
      </p>
    );
  }

  render() {
    return (
      <div className="article-container">
        <ColorLegend articleId="1" annotators={['Quotes', 'XLNet', 'BERT Embedding', 'Ash’s Annotation']} />
        {this.props.article.paragraphs.map((paragraph, index) => (
          this.getParagraph(paragraph, `paragraph-${index}`)
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Article);
