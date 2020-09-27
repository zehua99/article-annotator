import { ArticleType, AnnotationType } from './dataTypes';

export const ADD_ARTICLE = 'ADD_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';
export const UPDATE_CATEGORY_ARTICLE_LIST = 'UPDATE_CATEGORY_ARTICLE_LIST';
export const UPDATE_PARAGRAPH_TO_SENTENCES = 'UPDATE_PARAGRAPH_TO_SENTENCES';

export const ADD_ANNOTATION = 'ADD_ANNOTATION';
export const REMOVE_ANNOTATION = 'REMOVE_ANNOTATION';
export const UPDATE_ANNOTATION_RANK = 'UPDATE_ANNOTATION_RANK';

export const CHANGE_COLOR = 'CHANGE_COLOR';
export const ADD_COLORS_TO_DOCUMENT = 'ADD_COLORS_TO_DOCUMENT';

export const CHANGE_USERNAME = 'CHANGE_USERNAME';

export const CHANGE_SELECTED_TEXT = 'CHANGE_SELECTED_TEXT';
export const SET_CURRENT_ARTICLE = 'SET_CURRENT_ARTICLE';
export const DISPLAY_OTHERS_ANNOTATION = 'DISPLAY_OTHERS_ANNOTATION';
export const SET_CATEGORY_LIST = 'SET_CATEGORY_LIST';

/**
 * User
 */
export type ChangeUsernameActionType = {
  type: typeof CHANGE_USERNAME
  username: string
}

/**
 * Article
 */
export type AddArticleActionType = {
  type: typeof ADD_ARTICLE
  article: ArticleType
}

export type RemoveArticleActionType = {
  type: typeof REMOVE_ARTICLE
  article: ArticleType
}

export type UpdateCategoryArticleListActionType = {
  type: typeof UPDATE_CATEGORY_ARTICLE_LIST
  category: string
  articleIds: number[]
}

export type UpdateParagraphToSentencesActionType = {
  type: typeof UPDATE_PARAGRAPH_TO_SENTENCES
  article: ArticleType,
  paragraphIndex: number,
  sentences: number[],
}

export type LoadedArticleActionType = AddArticleActionType | RemoveArticleActionType;
export type ArticleActionType = LoadedArticleActionType
  | UpdateCategoryArticleListActionType
  | UpdateParagraphToSentencesActionType;

/**
 * Annotation
 */
export type AddAnnotationActionType = {
  type: typeof ADD_ANNOTATION
  annotation: AnnotationType
}

export type RemoveAnnotationActionType = {
  type: typeof REMOVE_ANNOTATION
  annotation: AnnotationType
}

export type UpdateAnnotationRankActionType = {
  type: typeof UPDATE_ANNOTATION_RANK
  annotation: AnnotationType
}

export type AnnotationActionType = AddAnnotationActionType
  | RemoveAnnotationActionType
  | UpdateAnnotationRankActionType;

/**
 * Color
 */
export type ChangeColorActionType = {
  type: typeof CHANGE_COLOR
  username: string
  color: string
}

export type AddColorsToDocumentActionType = {
  type: typeof ADD_COLORS_TO_DOCUMENT
  className: string
}

export type ColorActionType = ChangeColorActionType | AddColorsToDocumentActionType;

/**
 * Utility
 */
export type ChangeSelectedTextActionType = {
  type: typeof CHANGE_SELECTED_TEXT
  selectedText: {
    articleId: number
    category: string
    sentenceIndex: number
    selectedIn: 'ARTICLE_SECTION' | 'ANNOTATION_SECTION' | 'HOT_KEY' | 'DESELECT'
  }
}

export type SetCurrentArticleActionType = {
  type: typeof SET_CURRENT_ARTICLE
  articleId: number
  category: string
}

export type DisplayOthersAnnotationActionType = {
  type: typeof DISPLAY_OTHERS_ANNOTATION
}

export type SetCategoryListActionType = {
  type: typeof SET_CATEGORY_LIST
  categories: string[]
}

export type UtilityActionType = ChangeSelectedTextActionType
  | SetCurrentArticleActionType
  | DisplayOthersAnnotationActionType
  | SetCategoryListActionType;
