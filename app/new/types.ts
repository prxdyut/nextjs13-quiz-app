export type type_ = {
  all: Array<string>;
  keys?: Array<string>;
  contents?: Array<any>;
  categories?: Array<any>;
  selected: null | number;
};
export type data_ = {
  categories: type_;
  books: type_;
  chapters: type_;
  questions: type_;
  answers: Array<Array<string>>;
  concepts: Array<string>;
};
export type set_ = (_: data_) => void;
