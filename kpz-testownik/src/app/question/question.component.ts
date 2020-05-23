import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Question, QuestionType } from "../quiz.model";
import { Subject, Subscription } from "rxjs";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() check: Subject<void> = new Subject<void>();
  @Input() next: Subject<void> = new Subject<void>();
  @Output() answereProvided: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() answered: EventEmitter<boolean> = new EventEmitter<boolean>();

  userAnswers: Array<boolean>;
  wasChecked: boolean = false;

  private checkSubscription: Subscription;
  private nextSubscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.checkSubscription = this.check.subscribe(() => this.onCheck());
    this.nextSubscription = this.next.subscribe(() => this.onNext());

    this.userAnswers = new Array<boolean>(this.question.answers.length).fill(
      undefined
    );
  }

  ngOnDestroy(): void {
    this.checkSubscription.unsubscribe();
    this.nextSubscription.unsubscribe();
  }

  isCorrect(index: number, value: boolean = true) {
    return this.question.answers[index].isCorrect === value;
  }

  onAnswerSelect(index: number, value?: boolean): void {
    switch (this.question.questionType) {
      case QuestionType.MultipleAnswere:
        this.userAnswers[index] = !this.userAnswers[index];
        break;
      case QuestionType.SingleAnswere:
        this.userAnswers.fill(undefined);
        this.userAnswers[index] = true;
        break;
      case QuestionType.TrueFalse:
        this.userAnswers[index] = value;
        break;
    }
    if (this.userAnswers.some((value) => value !== undefined)) {
      this.answereProvided.emit(true);
    }
  }

  isAnswerCorrect(questionType: QuestionType) {
    let correctChoices: Array<boolean>;

    switch (questionType) {
      case QuestionType.MultipleAnswere:
      case QuestionType.SingleAnswere:
        correctChoices = this.userAnswers.map((v, i) => {
          return (
            this.question.answers[i].isCorrect === v ||
            (this.question.answers[i].isCorrect === false && v === undefined)
          );
        });
        break;
      case QuestionType.TrueFalse:
        correctChoices = this.userAnswers.map((v, i) => {
          return this.question.answers[i].isCorrect === v;
        });
        break;
    }

    const isAnswereCorrect = correctChoices.every((value) => {
      return value;
    });

    return isAnswereCorrect;
  }

  onNext(): void {
    this.wasChecked = false;
    this.userAnswers.fill(undefined);
  }

  onCheck(): void {
    this.wasChecked = true;
    const isAnswereCorrect = this.isAnswerCorrect(this.question.questionType);
    this.answered.emit(isAnswereCorrect);
  }
}
