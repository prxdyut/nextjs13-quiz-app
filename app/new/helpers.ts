import { type_ } from "./types";

export function uniqueValue(exercises: Array<string>) {
  const uniqueExercises = new Set(exercises);
  const uniqueExercisesArray = Array.from(uniqueExercises);
  return uniqueExercisesArray;
}

export const getDOMFor = async (url: string, query: string) => {
  const data = await getHTML(url);
  const HTMLDOM = new DOMParser();
  const doc = HTMLDOM.parseFromString(data, "text/html");
  return doc.querySelectorAll(query);
};

export const getHTML = async (url: string) => {
  const data = await fetch(url);
  return await data.text();
};

export const updateNestedState = (prevState, nestedProperty, newData) => ({
  ...prevState,
  [nestedProperty]: {
    ...prevState[nestedProperty],
    ...newData,
  },
});

export const shouldFetchCategories = (categories: type_) =>
  !categories.all.length;
export const shouldFetchBooks = (categories: type_, books: type_) =>
  categories.selected && !books.all.length;
export const shouldFetchChapters = (
  categories: type_,
  books: type_,
  chapters: type_
) => categories.selected && books.selected && !chapters.all.length;
export const shouldFetchQuestions = (
  categories: type_,
  books: type_,
  chapters: type_,
  questions: type_
) =>
  categories.selected &&
  books.selected &&
  chapters.selected &&
  !questions.all.length;// Helper function to determine if answers should be fetched
export const shouldFetchAnswers = (
  categories: type_,
  books: type_,
  chapters: type_,
  questions: type_
) => {
  return (
    categories.selected &&
    books.selected &&
    chapters.selected &&
    questions.all.length > 0
  );
};

