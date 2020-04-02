import { Component, OnInit } from "@angular/core";

import { Question } from "../question.model";
import { test } from "../test-mock";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  test: Question[];
  currentQuestion: Question;
  currentQuestionIndex: number = 0;
  isAnswerSelected: Array<boolean>;

  constructor() {}
  // these operations on date should be done with service
  // but it's only for presentation
  ngOnInit(): void {
    this.test = test;
    if (this.test.length > 0) {
      this.currentQuestion = this.test[this.currentQuestionIndex];
    }
    this.isAnswerSelected =
      new Array(this.currentQuestion.answers.length).fill(false);
  }

  nextQuestion(): void {
    ++this.currentQuestionIndex;
    if(this.currentQuestionIndex < this.test.length) {
      this.currentQuestion = this.test[this.currentQuestionIndex];
      this.isAnswerSelected.fill(false);
    }
    else {
      // navigate to summary
    }
  }

  getProgress(): number {
    return (this.currentQuestionIndex + 1) / this.test.length * 100;
  }

  onAnswerSelect(index: number): void {
    this.isAnswerSelected[index] = !this.isAnswerSelected[index];
  }
}
