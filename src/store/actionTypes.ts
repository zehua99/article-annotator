import { ArticleType, AnnotationType } from './dataTypes';

export const ADD_ARTICLE = 'ADD_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';

export const ADD_ANNOTATION = 'ADD_ANNOTATION';
export const REMOVE_ANNOTATION = 'REMOVE_ANNOTATION';

export const CHANGE_COLOR = 'CHANGE_COLOR';
export const ADD_COLORS_TO_DOCUMENT = 'ADD_COLORS_TO_DOCUMENT';

export const CHANGE_USERNAME = 'CHANGE_USERNAME';

export const CHANGE_SELECTED_TEXT = 'CHANGE_SELECTED_TEXT';

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

export type ArticleActionType = AddArticleActionType | RemoveArticleActionType;

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

export type AnnotationActionType = AddAnnotationActionType | RemoveAnnotationActionType;

/**
 * Color
 */
export type AddColorsToDocumentActionType = {
  type: typeof ADD_COLORS_TO_DOCUMENT
  className: string
}

export type ColorActionType = AddColorsToDocumentActionType;

/**
 * Utility
 */
export type ChangeSelectedTextActionType = {
  type: typeof CHANGE_SELECTED_TEXT
  selectedText: {
    articleId: number
    category: string
    sentenceIndex: number
    selectedIn: 'ARTICLE_SECTION' | 'ANNOTATION_SECTION'
  }
}

export type UtilityActionType = ChangeSelectedTextActionType;
