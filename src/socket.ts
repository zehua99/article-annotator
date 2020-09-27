import socketIOClient from 'socket.io-client';
import store, {
  AnnotationType, UPDATE_CATEGORY_ARTICLE_LIST,
  UPDATE_ANNOTATION_RANK, SET_CATEGORY_LIST,
  addAnnotation, removeAnnotation,
} from './store';
import { backend } from './config';

const socket = socketIOClient(backend);

export const fetchCategoryList = () => {
  socket.emit('refresh category list', (categories: string[]) => {
    store.dispatch({
      type: SET_CATEGORY_LIST,
      categories,
    });
  });
};

export const fetchArticleList = (category: string) => {
  socket.emit('refresh article list', { category }, (articleIds: number[]) => {
    store.dispatch({
      type: UPDATE_CATEGORY_ARTICLE_LIST,
      category,
      articleIds,
    });
  });
};

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
