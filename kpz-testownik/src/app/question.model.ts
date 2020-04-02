export interface Question {
  question_text: string,
  answers: {answer_text: string, is_correct: boolean}[]
}

