import { Component, OnInit } from "@angular/core";

import { QuizService } from "../quiz.service";
import { Quiz, Question, QuestionType } from "../quiz.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { QuizResult } from "../quiz-result.model";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"],
})
export class QuizComponent implements OnInit {
  checkSubject: Subject<void> = new Subject<void>();
  nextSubject: Subject<void> = new Subject<void>();

  quiz: Quiz;
  currentQuestion: Question;
  currentQuestionIndex: number = 0;
  wasCheckButtonClicked: boolean = false;
  correctCount = 0;
  incorrectCount = 0;
  learnedCount = 0;
  reocurences: Array<any>;
  isCommentCollapsed: boolean = true;
  wasAnswerProvided: boolean = false;

  constructor(
    private quizService: QuizService,
    private http: HttpClient,
    private router: Router
  ) {
    this.quiz = this.quizService.quiz;
    this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    this.reocurences = new Array<number>(this.quizService.questionCount);
    this.reocurences = this.quiz.questions.map((v, i) => {
      return { id: i, repeatCount: this.quizService.baseRepeatCount };
    });
  }

  ngOnInit(): void {}

  onNext(): void {
    this.wasAnswerProvided = false;

    const temp = this.reocurences.filter((v) => {
      return v.repeatCount > 0;
    });

    if (temp.length > 0) {
      const tempIdx = Math.floor(Math.random() * (temp.length - 1));

      this.currentQuestionIndex = temp[tempIdx].id;
      this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
      this.nextSubject.next();
      this.wasCheckButtonClicked = false;
      this.isCommentCollapsed = true;
    } else {
      const result: QuizResult = {
        quizName: this.quizService.quizName,
        time: 10,
        singleQuestionRepeat: this.quizService.baseRepeatCount,
        numberOfQuestions: this.quizService.questionCount,
        wrongAnswers: this.incorrectCount,
        correctAnswers: this.correctCount,
        date: new Date(),
      };
      this.http
        .post(`${environment.apiUrl}/quiz/result`, result)
        .pipe(first())
        .subscribe(
          () => {
            //this.router.navigate(["/"]);
            this.router.navigate(["summary"], { state: { result: result } });
          },
          (error) => {
            console.log(error);
            //this.messageService.error(error);
          }
        );
    }
  }

  onCheck(): void {
    this.checkSubject.next();
    this.wasCheckButtonClicked = true;
  }

  onAnswerProvided(): void {
    this.wasAnswerProvided = true;
  }

  onAnswer(isAnswereCorrect): void {
    if (isAnswereCorrect) {
      --this.reocurences[this.currentQuestionIndex].repeatCount;
      ++this.correctCount;

      if (this.reocurences[this.currentQuestionIndex].repeatCount === 0) {
        ++this.learnedCount;
      }
    } else {
      ++this.reocurences[this.currentQuestionIndex].repeatCount;
      ++this.incorrectCount;
    }
  }

  getLearnedProgress(): string {
    if (this.learnedCount === 0) {
      return "0%";
    }
    return (this.learnedCount / this.quizService.questionCount) * 100 + "%";
  }

  getCorrectProgress(): string {
    if (this.correctCount === 0) {
      return "0%";
    }
    return (
      (this.correctCount / (this.correctCount + this.incorrectCount)) * 100 +
      "%"
    );
  }

  getIncorrectProgress(): string {
    if (this.incorrectCount === 0) {
      return "0%";
    }
    return (
      (this.incorrectCount / (this.correctCount + this.incorrectCount)) * 100 +
      "%"
    );
  }
}
