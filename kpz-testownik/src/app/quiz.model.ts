export enum QuestionType {
  SingleAnswere = "SingleAnswere",
  MultipleAnswere = "MultipleAnswere",
  TrueFalse = "TrueFalse"
}

function isEnumQuestionType(arg: any): arg is QuestionType {
  return arg && Object.values(QuestionType).some((element) => {
    return JSON.stringify(arg) === JSON.stringify(element);
  });
}

export enum ContentType {
  Text = "Text",
  Image = "Image"
}

function isEnumContentType(arg: any): arg is ContentType {
  return arg && Object.values(ContentType).some((element) => {
    return JSON.stringify(arg) === JSON.stringify(element);
  });
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

function isAnswere(arg: any): boolean {
  return (arg
          && isEnumContentType(arg.contentType)
          && arg.content && typeof(arg.content) === "string"
          && arg.isCorrect != undefined && typeof(arg.isCorrect) === "boolean")
}

function isQuestion(arg: any): arg is Question {
  return (arg
          && isEnumQuestionType(arg.questionType)
          && isEnumContentType(arg.contentType)
          && arg.content && typeof(arg.content) === "string"
          && arg.answers && arg.answers.every((element) => {return isAnswere(element);}));
}

export interface Quiz {
  quizName: string;
  authorName: string;
  singleQuestionRepeat: number;
  questions: Question[];
}

export function isQuiz(arg: any): arg is Quiz {
  return (arg
          && arg.quizName && typeof(arg.quizName) === "string"
          && arg.authorName && typeof(arg.quizName) === "string"
          && arg.singleQuestionRepeat && typeof(arg.singleQuestionRepeat) === "number"
          && arg.questions && arg.questions.every((element) => {return isQuestion(element)}));
}
