import { Injectable } from '@angular/core';
import { Quiz } from './quiz.model.ts';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quiz: Quiz;

  constructor() { }

  public async loadQuizFile(file: File): Promise<boolean> {
    const reader = new FileReader();
    reader.onload = (e) => {
      const quizText = reader.result as string;
      this.quiz = JSON.parse(quizText);
    }
    reader.readAsText(file);

    return true;
  }

  private validateQuizJson(text: string): boolean {
    return false;
  }
}
