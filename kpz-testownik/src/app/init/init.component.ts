import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {
  public quizName: string;
  public authorName: string;
  public questionCount: number;
  public baseRepeatCount: number;

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.quizName = this.quizService.quizName;
    this.authorName = this.quizService.authorName;
    this.questionCount = this.quizService.questionCount;
    this.baseRepeatCount = this.quizService.baseRepeatCount;
  }
}
