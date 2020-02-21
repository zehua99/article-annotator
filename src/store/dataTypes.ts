export type ArticleType = {
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

export type ColorsType = Record<string, string>;

export type StateType = {
  username?: string;
  colors: ColorsType;
  articles: ArticleType[];
  annotations: AnnotationType[];
}
