import React, { MouseEvent } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import socket from '../socket';
import ColorLegend from './ColorLegend';
import Sentence from './Sentence';
import {
  StateType, ArticleType,
  getAllColors, getArticle, addAnnotation, ADD_ARTICLE,
} from '../store';

type ArticleProps = {
  articleId: number,
  category: string,
  hideLegend?: boolean,
}

const mapStateToProps = (state: StateType, ownProps: ArticleProps) => ({
  article: getArticle(state, ownProps.articleId, ownProps.category),
  colors: getAllColors(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addAnnotation: (article: ArticleType, sentenceIndex: number, annotator: string) => {
    dispatch(addAnnotation(article.id, article.category, sentenceIndex, annotator));
  },
  addArticle: (article: ArticleType) => {
    dispatch({
      type: ADD_ARTICLE,
      article,
    });
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsType = ArticleProps & PropsFromRedux;

class Article extends React.Component<PropsType, {}> {
  componentDidMount() {
    this.getArticle();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (prevProps.articleId !== this.props.articleId ||
      prevProps.category !== this.props.category) {
      this.getArticle();
    }
  }

  getArticle = () => {
    socket.emit('get article', {
      articleId: this.props.articleId,
      category: this.props.category,
    }, (article: ArticleType) => {
      this.props.addArticle(article);
      for (const annotation of article.annotations || []) {
        this.props.addAnnotation(article, annotation.sentenceIndex, annotation.annotator);
      }
    });
  }

  componentWillUnmount() {
    socket.emit('leave article', {
      articleId: this.props.articleId,
      category: this.props.category,
    });
  }

  getParagraph(paragraph: string, key: string) {
    if (!this.props.article) return;

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

    const { articleId, category } = this.props;

    const sentences: number[] = [];
    for (let i = start; i <= end; i++) {
      sentences.push(i);
    }

    return (
      <p key={key}>
        {sentences.map((index) => (
          <span key={`sentence-${index}`}>
            <Sentence articleId={articleId} category={category} sentenceIndex={index} />
            {' '}
          </span>
        ))}
      </p>
    );
  }

  blockContextMenu = (event: MouseEvent) => event.preventDefault();

  render() {
    if (!this.props.article) return <div className="article-container" />;
    return (
      <div className="article-container" onContextMenu={this.blockContextMenu}>
        {this.props.hideLegend ||
        <ColorLegend 
          articleId="1"
          annotators={['Quotes', 'XLNet', 'BERT Embedding', 'Ash’s Annotation']} />}
        {this.props.article.paragraphs.map((paragraph, index) => (
          this.getParagraph(paragraph, `paragraph-${index}`)
        ))}
      </div>
    );
  }
}

export default connector(Article);
