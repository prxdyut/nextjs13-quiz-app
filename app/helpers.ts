import { Question_, Section_, data_, type_ } from "./types";

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
function arraymove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

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
  class_.selected && categories.selected && books.selected && chapters.selected; // Helper function to determine if answers should be fetched
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
    questions.all.length
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
export const processQuestion = (html: string) => {
  return html
    .replaceAll("Multiple choice question.", "")
    .replaceAll("Answer the following in one or two sentences.", "");
};

export function romanize(num: number) {
  var lookup = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    },
    roman = "",
    i;
  for (i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman.toLowerCase();
}

export function deleteSection(questionPaper: Section_[], location: number[]) {
  let temp = [...questionPaper];

  function fn(data: Section_[], depth: number) {
    if (location.length == 1) {
      const toDelete = data[location[depth]];
      temp = temp.filter((_) => _.id != toDelete.id);
    } else if (depth == location.length - 2) {
      const toDelete = data[location[depth]].sections[location[depth + 1]];
      data[location[depth]].sections = data[location[depth]].sections.filter(
        (_) => _.id != toDelete.id
      );
    } else {
      fn(data[location[depth]].sections, depth + 1);
    }
  }

  fn(temp, 0);

  return temp;
}

export function moveSection(
  questionPaper: Section_[],
  location: number[],
  n: number
) {
  let temp = [...questionPaper];

  function fn(data: Section_[], depth: number) {
    if (location.length == 1) {
      if (
        location[depth] + n >= 0 &&
        location[depth] + n <= location.length + 1
      ) {
        arraymove(data, location[depth], location[depth] + n);
      }
    } else if (depth == location.length - 2) {
      if (
        location[depth + 1] + n >= 0 &&
        location[depth + 1] + n <= location.length + 1
      ) {
        arraymove(
          data[location[depth]].sections,
          location[depth + 1],
          location[depth + 1] + n
        );
      }
    } else {
      fn(data[location[depth]].sections, depth + 1);
    }
  }

  fn(temp, 0);

  return temp;
}

export function addSection(
  questionPaper: Section_[],
  location: number[],
  newData: { id: string; title: string, marks: string }
) {
  let temp = [...questionPaper];

  function fn(data: Section_[], depth: number) {
    if (location[0] == -1) {
      temp.push({ ...newData, questions: [], sections: [] });
    } else if (location.length == 1) {
      temp[location[depth]].sections.push({
        ...newData,
        questions: [],
        sections: [],
      });
    } else if (depth == location.length - 1) {
      data[location[depth]].sections.push({
        ...newData,
        questions: [],
        sections: [],
      });
    } else {
      fn(data[location[depth]].sections, depth + 1);
    }
  }

  fn(temp, 0);

  return temp;
}
export function editSection(
  questionPaper: Section_[],
  location: number[],
  newData: { id: string; title: string }
) {
  let temp = [...questionPaper];

  function fn(data: Section_[], depth: number) {
    if (location.length == 1) {
      temp[location[depth]] = { ...temp[location[depth]], ...newData };
    } else if (depth == location.length - 1) {
      data[location[depth]] = { ...data[location[depth]], ...newData };
    } else {
      fn(data[location[depth]].sections, depth + 1);
    }
  }

  fn(temp, 0);

  return temp;
}

export function addQuestion(
  questionPaper: Section_[],
  location: number[],
  question: string
) {
  let temp = [...questionPaper];

  function fn(data: Section_[], depth: number) {
    if (depth == location.length - 1) {
      data[location[depth]].questions.push({
        id: `(${romanize(data[location[depth]].questions.length + 1)})`,
        text: question,
      });
    } else {
      fn(data[location[depth]].sections, depth + 1);
    }
  }

  fn(temp, 0);

  return temp;
}


export function changeQuestion(
  questionPaper: Section_[],
  location: number[],
  question: string
) {
  let temp = [...questionPaper];

  function fn(data: Section_[], depth: number) {
    if (depth == location.length - 2) {
      data[location[depth]].questions[location[depth + 1]] = {
        ...data[location[depth]].questions[location[depth + 1]],
        text: question,
      };
    } else {
      fn(data[location[depth]].sections, depth + 1);
    }
  }

  fn(temp, 0);

  return temp;
}
export function getQuestion(
  questionPaper: Section_[],
  location: number[],
) {
  let temp = [...questionPaper];
  let res = ''

  function fn(data: Section_[], depth: number) {
    if (depth == location.length - 2) {
      res = data[location[depth]].questions[location[depth + 1]].text
    } else {
      fn(data[location[depth]].sections, depth + 1);
    }
  }

  fn(temp, 0);

  return res;
}

export function deleteQuestion(questionPaper: Section_[], location: number[]) {
  let temp = [...questionPaper];

  function fn(data: Section_[], depth: number) {
    if (depth == location.length - 2) {
      const toDelete = data[location[depth]].questions[location[depth + 1]];
      data[location[depth]].questions = data[location[depth]].questions.filter(
        (_, index) => index != location[depth + 1]
      );
    } else {
      fn(data[location[depth]].sections, depth + 1);
    }
  }

  fn(temp, 0);

  return temp;
}

export function moveQuestion(
  questionPaper: Section_[],
  location: number[],
  n: number
) {
  let temp = [...questionPaper];

  function fn(data: Section_[], depth: number) {
    if (depth == location.length - 2) {
      if (
        location[depth + 1] + n >= 0 &&
        location[depth + 1] + n <= location.length + 1
      ) {
        arraymove(
          data[location[depth]].questions,
          location[depth + 1],
          location[depth + 1] + n
        );
      }
    } else {
      fn(data[location[depth]].sections, depth + 1);
    }
  }

  fn(temp, 0);

  return temp;
}
