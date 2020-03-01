import store, {
  getSelectedSentence, isSentenceChecked, getUsername,
  addAnnotation, removeAnnotation, getCurrentArticle, getArticleIdList,
  ChangeSelectedTextActionType, CHANGE_SELECTED_TEXT, setCurrentArticle,
  getArticle,
} from '../store';
import socket from '../socket';

const toggleAnnotationForCurrentSentence = () => {
  const sentence = getSelectedSentence(store.getState());
  if (!sentence || sentence.articleId < 0) return;

  const username = getUsername(store.getState());
  if (!username) return;

  const { articleId, category, sentenceIndex} = sentence;
  const isChecked = isSentenceChecked(articleId, category, sentenceIndex)(store.getState());
  if (isChecked) {
    store.dispatch(removeAnnotation(articleId, category, sentenceIndex, username));
  } else {
    store.dispatch(addAnnotation(articleId, category, sentenceIndex, username));
  }
  socket.emit(`${isChecked ? 'remove' : 'add'} annotation`, {
    ...sentence,
    annotator: username,
    rank: 0,
  });
};

const selectPreviousSentence = () => selectSentenceWithOffset(-1);
const selectNextSentence = () => selectSentenceWithOffset(1);

const selectSentenceWithOffset = (offset: number) => {
  const article = getCurrentArticle(store.getState());
  if (!article) return;
  const a = getArticle(article.articleId, article.category)(store.getState());
  if (!a) return;
  const sentences = a.sentences;
  let sentence = getSelectedSentence(store.getState());
  if (!sentence || sentence.articleId !== article.articleId || sentence.articleId < 0) {
    sentence = {
      ...article,
      sentenceIndex: -offset,
      selectedIn: 'HOT_KEY',
    };
  }

  sentence.sentenceIndex += offset;
  sentence.sentenceIndex = Math.min(sentences.length - 1, sentence.sentenceIndex);
  sentence.sentenceIndex = Math.max(0, sentence.sentenceIndex);
  sentence.selectedIn = 'HOT_KEY';

  deselectSentence();
  store.dispatch({
    type: CHANGE_SELECTED_TEXT,
    selectedText: sentence,
  } as ChangeSelectedTextActionType);
};

const deselectSentence = () => {
  let sentence = getSelectedSentence(store.getState());
  if (sentence) {
    return store.dispatch({
      type: CHANGE_SELECTED_TEXT,
      selectedText: { ...sentence, selectedIn: 'DESELECT' },
    } as ChangeSelectedTextActionType);
  }

  store.dispatch({
    type: CHANGE_SELECTED_TEXT,
    selectedText: { articleId: -1, category: '', sentenceIndex: -1, selectedIn: 'DESELECT' },
  } as ChangeSelectedTextActionType);
}

const goToLastArticle = () => goToArticleWithOffset(-1);
const goToNextArticle = () => goToArticleWithOffset(1);

const goToArticleWithOffset = (offset: number) => {
  const article = getCurrentArticle(store.getState());
  if (!article) return;
  const idList = getArticleIdList(article.category)(store.getState());
  let index = idList.indexOf(article.articleId) + offset;
  index = Math.min(idList.length - 1, index);
  index = Math.max(0, index);
  store.dispatch(setCurrentArticle(idList[index], article.category));
  window.history.pushState(null, '', `/article-annotator/${article.category}/${idList[index]}`);
}

export const hotKeyMap = {
  ENTER: ['enter', 'k'],
  MOVE_UP: ['w', 'h'],
  MOVE_DOWN: ['s', 'j'],
  DESELECT: ['q', 'l'],
  LAST_ARTICLE: ['[', 'y'],
  NEXT_ARTICLE: [']', 'u'],
};

export const hotKeyHandlers = {
  ENTER: toggleAnnotationForCurrentSentence,
  MOVE_UP: selectPreviousSentence,
  MOVE_DOWN: selectNextSentence,
  DESELECT: deselectSentence,
  LAST_ARTICLE: goToLastArticle,
  NEXT_ARTICLE: goToNextArticle,
};
