import { Dispatch, SetStateAction } from "react";

export type solution_ = "Textbook Solutions" | "Important Solutions" | "";
export type selected_ = string[];
export type type_ = {
  all: Array<string>;
  keys?: Array<string>;
  contents?: Array<any>;
  categories?: Array<any>;
  selected?: number;
  selections?: number[];
};

export type data_ = {
  categories: type_;
  books: type_;
  class: type_;
  chapters: type_;
  questions: type_;
  answers: Array<Array<string>>;
  concepts: Array<string>;
  answerType?: solution_;
  topics: type_;
};

export type set_ =
  | Dispatch<SetStateAction<data_>>
  | Dispatch<SetStateAction<selected_>>;

export type options_ = {
  filter: string;
  search: string;
  showAnswers: boolean;
};

export type filterValue_ = {
  label: string;
  questions: string[];
  answers: string[][];
};
