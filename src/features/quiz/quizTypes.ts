export interface Quiz {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  language_code: string;
  created_at: string;
}



export interface QuizResultResponse {
  session_id: number;
  results: QuizResult[];
}

export interface QuizResult {
  dimension: string;
  dimension_description: string;
  score: number;
  interpretation: string;
  suggestion: string;
}