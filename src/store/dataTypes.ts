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
}

export type AnnotationType = {
  articleId: number;
  category: string;
  sentenceIndex: number;
  annotator: string;
}

export type ColorsType = {
  annotatorToColorMap: Record<string, string>,
  annotatorToAnnotatorsMap: Record<string, string[]>,
  existingCombinations: string[],
};

export type UtilityType = {
  selectedSentence?: {
    articleId: number;
    category: string;
    sentenceIndex: number;
    selectedIn: 'ARTICLE_SECTION' | 'ANNOTATION_SECTION';
  }
}

export type StateType = {
  username?: string;
  colors: ColorsType;
  articles: ArticleType[];
  annotations: AnnotationType[];
  utils: UtilityType;
}
