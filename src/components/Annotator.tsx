import React from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import {
  StateType, AnnotationType,
  getArticleAnnotations, getUsername, UPDATE_ANNOTATION_RANK,
  getAnnotatedSentences, getLastArticleId, getNextArticleId,
} from '../store';
import socket from '../socket';
import QuestionCard from './QuestionCard';
import SentenceCard from './SentenceCard';

type AnnotatorProps = {
  articleId: number,
  category: string,
}

const mapStateToProps = (state: StateType, props: AnnotatorProps) => ({
  annotatedSentences: getAnnotatedSentences(props.articleId, props.category)(state),
  lastArticleId: getLastArticleId(props.articleId, props.category)(state),
  nextArticleId: getNextArticleId(props.articleId, props.category)(state),
  annotations: getArticleAnnotations(props.articleId, props.category)(state),
  username: getUsername(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateAnnotationRank: (annotation: AnnotationType) => {
    dispatch({
      type: UPDATE_ANNOTATION_RANK,
      annotation,
    });
  }
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsType = AnnotatorProps & PropsFromRedux & RouteComponentProps;

class Annotator extends React.Component<PropsType, {}> {
  goToLastArticle = () => {
    const { category, history, lastArticleId } = this.props;
    if (lastArticleId < 0) return;
    history.push(`/${category}/${lastArticleId}`);
  }

  goToNextArticle = () => {
    const { category, history, nextArticleId } = this.props;
    if (nextArticleId < 0) return;
    history.push(`/${category}/${nextArticleId}`);
  }

  onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const sentenceIndex = this.props.annotatedSentences[result.source.index];
    const destSentenceIndex = this.props.annotatedSentences[result.destination.index];
    if (sentenceIndex === destSentenceIndex) return;

    let annotationIndex = null;
    for (let i = 0; i < this.props.annotations.length; i++) {
      const annotation = this.props.annotations[i];
      if (sentenceIndex === annotation.sentenceIndex
        && annotation.annotator === this.props.username) {
        annotationIndex = i;
        break;
      }
    }
    if (annotationIndex === null) return;

    let newRank = null;
    const destIndex = result.destination.index;
    let neighborSentenceIndex = -1;
    if (destIndex !== 0 && destIndex !== this.props.annotatedSentences.length - 1) {
      neighborSentenceIndex = result.source.index > destIndex
        ? this.props.annotatedSentences[destIndex - 1]
        : this.props.annotatedSentences[destIndex + 1];
    }
    let count = 0;
    for (let i = 0; i < this.props.annotations.length && count < 2; i++) {
      const annotation = this.props.annotations[i];
      if ([destSentenceIndex, neighborSentenceIndex].includes(annotation.sentenceIndex)
        && annotation.annotator === this.props.username) {
        newRank = (newRank || 0) + (annotation.rank || 1) / 2;
        count++;
      }
    }
    if (newRank === null) return;
    if (destIndex === 0) {
      if (count < 1) return;
      newRank = 2 * newRank + 1024;
    } else if (destIndex === this.props.annotatedSentences.length - 1) {
      if (count < 1) return;
    } else if (count < 2) return;

    const ann = {
      ...this.props.annotations[annotationIndex],
      rank: newRank,
    };

    this.props.updateAnnotationRank(ann);
    socket.emit('update annotation rank', ann);
  }

  render() {
    return (
      <div className="annotator-container">
        <QuestionCard articleId={this.props.articleId} category={this.props.category} />
        <h3>Select sentences that are relative to the question.</h3>

        <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
          <Droppable droppableId="annotation-list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {(this.props.annotatedSentences || []).map((sentenceIndex, index) => (
                  <Draggable
                    key={`sentence-card-${sentenceIndex}`}
                    draggableId={`sentence-${sentenceIndex}`}
                    index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ outline: 0, ...provided.draggableProps.style }}>
                        <SentenceCard
                          articleId={this.props.articleId}
                          category={this.props.category}
                          sentenceIndex={sentenceIndex}
                          index={index + 1} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="last-next-buttons">
          <span
            onClick={this.goToLastArticle}
            className="last-article-button"
            style={this.props.lastArticleId < 0 ? {visibility: 'hidden'} : {}}
          >
            Last Article
          </span>
          <span
            onClick={this.goToNextArticle}
            className="next-article-button"
            style={this.props.nextArticleId < 0 ? {visibility: 'hidden'} : {}}
          >
            Next Article
          </span>
        </div>
      </div>
    );
  }
}

export default withRouter(connector(Annotator));
