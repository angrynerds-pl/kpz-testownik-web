import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Question, QuestionType, ContentType } from "../quiz.model";
import { Subject, Subscription } from "rxjs";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  ContentType = ContentType;

  @Input() question: Question;
  @Input() check: Subject<void> = new Subject<void>();
  @Input() next: Subject<void> = new Subject<void>();
  @Output() answereProvided: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  @Output() answered: EventEmitter<boolean> = new EventEmitter<boolean>();

  userAnswers: Array<boolean>;
  wasChecked: boolean = false;
  recentlyClickedAnswer: number;
  private clickTimer: any;
  isModalVisible: boolean = false;

  private checkSubscription: Subscription;
  private nextSubscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.checkSubscription = this.check.subscribe(() => this.onCheck());
    this.nextSubscription = this.next.subscribe(() => this.onNext());

    this.userAnswers = new Array<boolean>(10);
  }

  ngOnDestroy(): void {
    this.checkSubscription.unsubscribe();
    this.nextSubscription.unsubscribe();
  }

  isCorrect(index: number, value: boolean = true) {
    return this.question.answers[index].isCorrect === value;
  }

  onAnswerSelect(index: number, value?: boolean): void {
    this.recentlyClickedAnswer = index;

    if (this.clickTimer) {
      clearTimeout(this.clickTimer);
    }
    this.clickTimer = setTimeout(() => {
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
    }, 200);
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  hideModal(): void {
    this.isModalVisible = false;
  }

  onAnswerContentZoom(index: number): void {
    clearTimeout(this.clickTimer);
    this.recentlyClickedAnswer = index;
    if (this.question.answers[this.recentlyClickedAnswer].contentType == ContentType.Image) {
      this.showModal()
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
    this.userAnswers = new Array<boolean>(10).fill(undefined);
  }

  onCheck(): void {
    this.wasChecked = true;
    this.userAnswers = this.userAnswers.slice(0, this.question.answers.length);
    const isAnswereCorrect = this.isAnswerCorrect(this.question.questionType);
    this.answered.emit(isAnswereCorrect);
  }
}
