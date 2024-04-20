import { Dispatch, SetStateAction } from "react";

export type solution_ = "Textbook Solutions" | "Important Solutions" | ''

export type type_ = {
  all: Array<string>;
  keys?: Array<string>;
  contents?: Array<any>;
  categories?: Array<any>;
  selected: null | number;
};

export type data_ = {
  list? : string[],
  categories: type_;
  books: type_;
  class: type_;
  chapters: type_;
  questions: type_;
  answers: Array<Array<string>>;
  concepts: Array<string>;
  answerType?:solution_ ;
  topics: type_
};

export type set_ = Dispatch<SetStateAction<data_>>;
