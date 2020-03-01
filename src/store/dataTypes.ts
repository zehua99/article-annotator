export type ArticleType = {
  id: number;
  category: string;
  article: string;
  question: string;
  explanation: string;
  answer: number;
  paragraphs: string[];
  sentences: string[];
  checkedSentences: number[];
  annotations?: AnnotationType[];
  paragraphToSentences?: number[][];
}

export type AnnotationType = {
  articleId: number;
  category: string;
  sentenceIndex: number;
  annotator: string;
  rank?: number;
}

export type ColorsType = {
  annotatorToColorMap: Record<string, string>,
  annotatorToAnnotatorsMap: Record<string, string[]>,
  existingCombinations: string[],
};

export const allColors = [
  'rgb(214, 157, 177)',
  'rgb(255, 227, 134)',
  'rgb(190, 144, 212)',
  'rgb(141, 195, 234)',
  'rgb(215, 186, 229)',
  'rgba(0, 181, 204, 1)',
  'rgb(140, 20, 252)',
  'rgb(241, 169, 160)',
  'rgb(169, 222, 204)',
  'rgb(145, 61, 136)',
  'rgb(226, 106, 106)',
  'rgb(118, 93, 105)',
  'rgb(154, 18, 179)',
];

export type ArticleStateType = {
  categoryToArticleIdListMap: Record<string, number[]>;
  loadedArticles: ArticleType[];
};

export type UtilityType = {
  selectedSentence?: {
    articleId: number;
    category: string;
    sentenceIndex: number;
    selectedIn: 'ARTICLE_SECTION' | 'ANNOTATION_SECTION' | 'HOT_KEY' | 'DESELECT';
  },
  currentArticle?: {
    articleId: number;
    category: string;
  },
}

export type StateType = {
  username?: string;
  colors: ColorsType;
  articles: ArticleStateType;
  annotations: AnnotationType[];
  utils: UtilityType;
}
