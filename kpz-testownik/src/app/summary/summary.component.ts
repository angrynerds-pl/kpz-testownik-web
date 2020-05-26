import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { QuizResult } from '../quiz-result.model';
import { QuizService } from '../quiz.service';
import { Question } from '../quiz.model';

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"],
})
export class SummaryComponent implements OnInit {
  correct: number = 0;
  wrong: number = 0;
  percentage: string = "";
  count: number = 0;
  isVisibleArr: Array<boolean>;

  constructor(
    private router: Router,
    public quizService: QuizService
  ) {
    const result: QuizResult = this.router.getCurrentNavigation().extras.state.result;

    this.count = result.numberOfQuestions;
    this.correct = result.correctAnswers;
    this.wrong = result.wrongAnswers;
    this.percentage = this.correct / this.count * 100 + "%";


    this.isVisibleArr = new Array<boolean>(this.quizService.questionCount);
    this.isVisibleArr.fill(false);
    this.isVisibleArr[0] = true;
  }

  ngOnInit(): void {

  }

  onListItemClick(idx: number): void {
    this.isVisibleArr.fill(false);
    this.isVisibleArr[idx] = true;
  }

  getQuestionText(idx: number): string {
    return this.quizService.currentQuiz.questions[idx].content;
  }

  getQuestion(idx: number): Question {
    return this.quizService.currentQuiz.questions[idx];
  }
}
