import { Component, OnInit, Input } from "@angular/core";
import { Question, ContentType } from "../quiz.model";

@Component({
  selector: "app-question-summary",
  templateUrl: "./question-summary.component.html",
  styleUrls: ["./question-summary.component.css"],
})
export class QuestionSummaryComponent implements OnInit {
  ContentType = ContentType;

  @Input() question: Question;

  constructor() {}

  ngOnInit(): void {}
}
