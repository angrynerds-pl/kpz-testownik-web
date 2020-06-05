import { Injectable } from "@angular/core";
import { Quiz, isQuiz } from "./quiz.model";

@Injectable({
  providedIn: "root",
})
export class QuizService {
  quiz: Quiz;

  constructor() {
    this.quiz = JSON.parse(sessionStorage.getItem("currentQuiz"));
  }

  public async loadQuizFile(file: File): Promise<boolean> {
    let isQuizValid = false;
    try {
      var fileText = await this.readQuizFile(file);
      var quizObject = JSON.parse(fileText);
    } catch (e) {
      console.log(e);
    }

    if (this.validateQuizJson(quizObject)) {
      isQuizValid = true;
      sessionStorage.setItem("currentQuiz", JSON.stringify(quizObject));
      this.quiz = quizObject;
    } else {
      isQuizValid = false;
    }

    return isQuizValid;
  }

  private readQuizFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsText(file);
    });
  }

  private validateQuizJson(quizObject: any): boolean {
    return isQuiz(quizObject);
  }

  public get quizName(): string {
    return this.quiz.quizName;
  }

  public get authorName(): string {
    return this.quiz.authorName;
  }

  public get questionCount(): number {
    return this.quiz.questions.length;
  }

  public get baseRepeatCount(): number {
    return this.quiz.singleQuestionRepeat;
  }

  public get currentQuiz(): Quiz {
    return this.quiz;
  }
}
