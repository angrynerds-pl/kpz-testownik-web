import { Component, OnInit } from "@angular/core";

import { QuizService } from '../quiz.service';
import { Quiz, Question, QuestionType } from '../quiz.model.ts';

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  quiz: Quiz;
  currentQuestion: Question;
  currentQuestionIndex: number = 0;
  isAnswerSelected: Array<boolean>;

  constructor(
    public quizService: QuizService
  ) {}
  // these operations on date should be done with service
  // but it's only for presentation
  ngOnInit(): void {
    this.quiz = this.quizService.quiz;
    if (this.quiz.questions.length > 0) {
      this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    }
    this.isAnswerSelected =
      new Array(this.currentQuestion.answers.length).fill(false);
  }

  nextQuestion(): void {
    ++this.currentQuestionIndex;
    if(this.currentQuestionIndex < this.quiz.questions.length) {
      this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
      this.isAnswerSelected.fill(false);
    }
    else {
      // navigate to summary
    }
  }

  getProgress(): number {
    return this.currentQuestionIndex / this.quiz.questions.length * 100;
  }

  onAnswerSelect(index: number): void {
    this.isAnswerSelected[index] = !this.isAnswerSelected[index];
  }
}
