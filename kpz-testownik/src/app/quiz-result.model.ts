import { Time } from '@angular/common';

export interface QuizResult {
  quizName: string;
  time: number;
  singleQuestionRepeat: number;
  numberOfQuestions: number;
  wrongAnswers: number;
  correctAnswers: number;
  date: Date;
}
