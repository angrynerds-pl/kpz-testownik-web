import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router"
import { Question } from "../question.model";
import { test } from "../test-mock"
import { score } from "../score"

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
  scoreArray: Array<boolean>;
  buttonType: string = "btn btn-warning";

  constructor(public router : Router) {}

  // these operations on date should be done with service
  // but it's only for presentation
  ngOnInit(): void {
    this.test = test;
    this.scoreArray = new Array(this.test.length).fill(false);
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
      this.buttonType = "btn btn-warning";
    }
    else {
      this.router.navigate(['summary']);
    }
  }

  getProgress(): number {
    return (this.currentQuestionIndex + 1) / this.test.length * 100;
  }

  checkAnswer(): void{
    if(this.scoreArray[this.currentQuestionIndex])
      this.buttonType="btn btn-success";
    else
      this.buttonType="btn btn-danger"; 
  }

  onAnswerSelect(index: number): void {
    if(test[this.currentQuestionIndex].answers[index].is_correct==true)
      this.scoreArray[this.currentQuestionIndex]=true;
    else
      this.scoreArray[this.currentQuestionIndex]=false;
    
      this.buttonType = "btn btn-warning";
  }
}
