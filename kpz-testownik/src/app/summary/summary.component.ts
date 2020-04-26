import { Component, OnInit } from '@angular/core';
import { score } from "../score"

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  correct: number=0;
  wrong: number=0;
  percentage: string="";
  count: number=0;

  constructor() { }

  ngOnInit(): void {
    this.count = score.length;
    score.forEach(element => {
      if(element)
        this.correct++;
      this.percentage = ((this.correct/score.length)*100).toPrecision(3);
    });
  }
}
