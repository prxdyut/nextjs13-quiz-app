import { data_, type_ } from "./types";

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

export const shouldFetchCategories = ({ categories }: data_) =>
  !categories.all.length;
export const shouldFetchClass = ({ categories, class: class_ }: data_) =>
  categories.selected && !class_.all.length;
export const shouldFetchBooks = ({ categories, books, class: class_ }: data_) =>
  class_.selected && categories.selected && !books.all.length;

export const shouldFetchChapters = ({
  categories,
  class: class_,
  books,
}: data_) => class_.selected && categories.selected && books.selected;
export const shouldFetchQuestions = ({
  categories,
  books,
  class: class_,
  chapters,
  answerType,
  questions,
}: data_) =>
  class_.selected &&
  categories.selected &&
  books.selected &&
  chapters.selected; // Helper function to determine if answers should be fetched
export const shouldFetchAnswers = ({
  categories,
  books,
  chapters,
  class: class_,
  questions,
}: data_) => {
  return (
    class_.selected &&
    categories.selected &&
    books.selected &&
    chapters.selected &&
    questions.all.length > 0
  );
};
export function findCommonWords(subjects) {
  // Split each subject into words and store them in arrays
  let wordArrays = subjects.map((subject) =>
    subject.toLowerCase().split(/\s+/)
  );

  // Use the first array as a reference for common words
  let commonWords = wordArrays[0];

  // Iterate over each word array to find common words
  for (let i = 1; i < wordArrays.length; i++) {
    const currentArray = wordArrays[i];
    // Filter the commonWords array to keep only words present in currentArray
    commonWords = commonWords.filter((word) => currentArray.includes(word));
  }

  // Return the array of common words
  return commonWords;
}

export function removeWordsFromString(inputStr, wordsToRemove): string {
  // Split the input string into an array of words
  const wordsArray = inputStr.split(/\s+/);

  // Filter out words that are not in the wordsToRemove array
  const filteredWords = wordsArray.filter(
    (word) => !wordsToRemove.includes(word)
  );

  // Join the filtered words back into a string
  const resultString = filteredWords.join(" ");

  return resultString;
}
export function capitalizeFirstLetter(sentence) {
  // Split the sentence into an array of words
  let words = sentence.split(" ");

  // Capitalize the first letter of each word
  let capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the capitalized words back into a sentence
  let capitalizedSentence = capitalizedWords.join(" ");

  return capitalizedSentence;
}
