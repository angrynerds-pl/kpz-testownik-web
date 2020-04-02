import { Question } from "./question.model"

export const test: Question[] = [
  {
    question_text: "Jaki jest Twój ulubiony kolor?",
    answers: [
      { answer_text: "Szary", is_correct: false },
      { answer_text: "Zielony", is_correct: true },
      { answer_text: "Niebieski", is_correct: false },
      { answer_text: "Fioletowy", is_correct: false },
      { answer_text: "Indygo", is_correct: true },
    ]
  },
  {
    question_text: "Jaki jest Twój drugi ulubiony kolor?",
    answers: [
      { answer_text: "Szary", is_correct: false },
      { answer_text: "Zielony", is_correct: true },
      { answer_text: "Niebieski", is_correct: false },
      { answer_text: "Fioletowy", is_correct: false },
      { answer_text: "Indygo", is_correct: true },
    ]
  },
  {
    question_text: "Czy w4arto?",
    answers: [
      { answer_text: "Tak", is_correct: false },
      { answer_text: "Jeszcze jak", is_correct: false },
      { answer_text: "Oczywiście", is_correct: false }
    ]
  },
  {
    question_text: "2+2*2 = ",
    answers: [
      { answer_text: "NaN", is_correct: true },
      { answer_text: "8", is_correct: true },
      { answer_text: "6", is_correct: true },
      { answer_text: "-2", is_correct: true },
      { answer_text: "2222", is_correct: true },
    ]
  }
]
