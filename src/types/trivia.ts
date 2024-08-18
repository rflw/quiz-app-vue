import { Nullable } from "./core"

export enum RESPONSE_CODE {
  SUCCESS, // Returned results successfully.
  NO_RESULTS, // Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
  INVALID_PARAMETER, // Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)
  TOKEN_NOT_FOUND, // Token does not exist
  TOKEN_EMPTY, // Session Token has returned all possible questions for the specified query. Resetting the Token is necessary
  RATE_LIMIT // Too many requests have occurred. Each IP can only access the API once every 5 seconds.
}

enum QUESTION_TYPE {
  BOOLEAN = 'boolean',
  MULTIPLE = 'multiple'
}

enum QUESTION_DIFFICULTY {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export type QuestionEntity = {
  type: QUESTION_TYPE,
  difficulty: QUESTION_DIFFICULTY,
  category: string, // TODO: get categories names enum from TRIVIA API dynamically
  question: string,
  correct_answer: string,
  incorrect_answers: Array<string>
}

export type Questions = Array<QuestionEntity>;

type TriviaAPIResponse = {
  response_code: RESPONSE_CODE;
  results: Questions;
}

export type ResponseData = Nullable<TriviaAPIResponse>;
