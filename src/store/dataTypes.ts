export type ArticleType = {
  id: number;
  category: string;
  article: string;
  question: string;
  explanation: string;
  answer: number;
  paragraphs: string[];
  sentences: string[];
}

export type AnnotationType = {
  articleId: number;
  sentenceIndex: number;
}

export type ColorsType = {
  annotatorToColorMap: Record<string, string>,
  annotatorToAnnotatorsMap: Record<string, string[]>,
  existingCombinations: string[],
};

export type StateType = {
  username?: string;
  colors: ColorsType;
  articles: ArticleType[];
  annotations: AnnotationType[];
}
