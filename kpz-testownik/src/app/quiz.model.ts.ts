export enum QuestionType {
  SingleAnswere = "SingleAnswere",
  MultipleAnswere = "MultipleAnswere",
  TrueFalse = "TrueFalse"
}

export enum ContentType {
  Text = "Text",
  Image = "Image"
}

export interface Question {
  questionType: QuestionType;
  contentType: ContentType;
  content: string;
  answers: {
    contentType: ContentType;
    content: string;
    isCorrect: boolean;
  }[];
}

export interface Quiz {
  quizName: string;
  authorName: string;
  singleQuestionRepeat: number;
  questions: Question[];
}
