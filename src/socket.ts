import socketIOClient from 'socket.io-client';
import store, {
  AnnotationType, UPDATE_CATEGORY_ARTICLE_LIST, UPDATE_ANNOTATION_RANK,
  addAnnotation, removeAnnotation,
} from './store';

const socket = socketIOClient(`http://0.0.0.0:5000/`);

socket.emit('refresh article list', { category: 'Question 1' }, (articleIds: number[]) => {
  store.dispatch({
    type: UPDATE_CATEGORY_ARTICLE_LIST,
    category: 'Question 1',
    articleIds,
  });
});

socket.on('add annotation', (annotation: AnnotationType) => {
  const { articleId, category, annotator, sentenceIndex } = annotation;
  store.dispatch(addAnnotation(articleId, category, sentenceIndex, annotator));
});

socket.on('remove annotation', (annotation: AnnotationType) => {
  const { articleId, category, annotator, sentenceIndex } = annotation;
  store.dispatch(removeAnnotation(articleId, category, sentenceIndex, annotator));
});

socket.on('update annotation rank', (annotation: AnnotationType) => {
  store.dispatch({
    type: UPDATE_ANNOTATION_RANK,
    annotation,
  });
});

export default socket;
