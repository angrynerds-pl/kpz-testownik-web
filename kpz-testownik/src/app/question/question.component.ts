import { Component, OnInit } from "@angular/core";

import { QuizService } from "../quiz.service";
import { Quiz, Question, QuestionType } from "../quiz.model";

enum UserChoice {
  NotMarkedButCorrect = "NotMarkedButCorrect",
  NotMarkedButIncorrect = "NotMarkedButIncorrect",
  MarkedAndCorrect = "MarkedAndCorrect",
  MarkedAndIncorrect = "MarkedAndIncorrect",
}

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"],
})
export class QuestionComponent implements OnInit {
  quiz: Quiz;
  currentQuestion: Question;
  currentQuestionIndex: number = 0;
  userAnswere: Array<boolean>;
  wasCheckButtonClicked: boolean = false;
  correctCount = 0;
  incorrectCount = 0;
  learnedCount = 0;

  constructor(private quizService: QuizService) {
    this.quiz = this.quizService.quiz;
  }

  ngOnInit(): void {
    if (this.quiz.questions.length > 0) {
      this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
    }
    this.userAnswere = new Array<boolean>(this.quizService.questionCount).fill(
      undefined
    );
  }

  nextQuestion(): void {
    ++this.currentQuestionIndex;
    if (this.currentQuestionIndex < this.quiz.questions.length) {
      this.currentQuestion = this.quiz.questions[this.currentQuestionIndex];
      this.userAnswere.fill(undefined);
      this.wasCheckButtonClicked = false;
    } else {
      // navigate to summary
    }
  }

  isCorrect(index: number, value: boolean = true) {
    return this.currentQuestion.answers[index].isCorrect === value;
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

  onAnswerSelect(index: number, value?: boolean): void {
    switch (this.currentQuestion.questionType) {
      case QuestionType.MultipleAnswere:
        this.userAnswere[index] = !this.userAnswere[index];
        break;
      case QuestionType.SingleAnswere:
        this.userAnswere.fill(undefined);
        this.userAnswere[index] = true;
        break;
      case QuestionType.TrueFalse:
        this.userAnswere[index] = value;
        break;
    }
  }

  isAnswereCorrect(questionType: QuestionType) {
    let correctChoices: Array<boolean>;

    switch (questionType) {
      case QuestionType.MultipleAnswere:
      case QuestionType.SingleAnswere:
        correctChoices = this.userAnswere.map((v, i) => {
          return (
            this.currentQuestion.answers[i].isCorrect === v ||
            (this.currentQuestion.answers[i].isCorrect === false &&
              v === undefined)
          );
        });
        break;
      case QuestionType.TrueFalse:
        correctChoices = this.userAnswere.map((v, i) => {
          return this.currentQuestion.answers[i].isCorrect === v;
        });
        break;
    }

    const isAnswereCorrect = correctChoices.every((value) => {
      return value;
    });

    return isAnswereCorrect;
  }

  onCheckQuestion(): void {
    this.wasCheckButtonClicked = true;

    const isAnswereCorrect = this.isAnswereCorrect(
      this.currentQuestion.questionType
    );
    if (isAnswereCorrect) {
      ++this.correctCount;
      ++this.learnedCount;
    } else {
      ++this.incorrectCount;
    }
  }
}
