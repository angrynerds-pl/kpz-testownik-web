import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { QuizResult } from '../quiz-result.model';

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

  constructor(
    private router: Router
  ) {
    const result: QuizResult = this.router.getCurrentNavigation().extras.state.result;

    this.count = result.numberOfQuestions;
    this.correct = result.correctAnswers;
    this.wrong = result.wrongAnswers;
    this.percentage = this.correct / this.count * 100 + "%";
  }

  ngOnInit(): void {
    // this.count = score.length;
    // score.forEach(element => {
    //   if(element)
    //     this.correct++;
    //   this.percentage = ((this.correct/score.length)*100).toPrecision(3);
    // });
  }
}
