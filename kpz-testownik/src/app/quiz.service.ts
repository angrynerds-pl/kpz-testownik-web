import { Injectable } from '@angular/core';
import { Quiz, isQuiz } from './quiz.model.ts';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quiz: Quiz;

  constructor() { }

  public async loadQuizFile(file: File): Promise<boolean> {
    let readPromise = (file: File) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => {
          reader.abort();
          reject(new DOMException("Problem parsing input file."));
        }
        reader.onload = () => {
          resolve(reader.result as string);
        }
        reader.readAsText(file);
      })
    }

    let isQuizValid = false;
    try {
      var fileText = await readPromise(file)
    } catch (e) {
      console.log(e)
    }

    var quizObject = JSON.parse(fileText);
    if (this.validateQuizJson(quizObject)) {
      isQuizValid = true;
      this.quiz = quizObject;
    } else {
      isQuizValid = false;
    }

    return isQuizValid;
  }

  private validateQuizJson(quizObject: any): boolean {
    return isQuiz(quizObject);
  }
}
