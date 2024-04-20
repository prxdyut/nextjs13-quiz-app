import { shaalaaTextSol, shaalaaBase } from "./consts";

import { getDOMFor } from "./helpers";
import { data_ } from "./types";

export const getBookCategory = async (data: data_) => {
  let res = { all: [] };
  const data_: NodeListOf<Element> = await getDOMFor(
    shaalaaTextSol,
    "#content .grid_right .grid_col_left .block.clearfix h2"
  );
  data_.forEach((elem) => {
    res.all.push(elem.textContent);
  });
  return res;
};
export const getBooks = async (data: data_) => {
  let res = { keys: [], all: [] };
  const data_: NodeListOf<Element> = await getDOMFor(
    shaalaaTextSol,
    `#content .grid_right .grid_col_left .block.clearfix:nth-of-type(${data.categories.selected}) a`
  );
  data_.forEach((elem) => {
    res.keys.push(elem.getAttribute("href"));
    res.all.push(elem.textContent);
  });
  return res;
};
export const getChapters = async (data: data_) => {
  let res = { keys: [], all: [] };
  const data_: NodeListOf<Element> = await getDOMFor(
    shaalaaBase + data.books.keys[data.books.selected - 1],
    `#content .grid_right .grid_col_left:nth-of-type(1) .block ul:nth-of-type(1) a`
  );
  data_.forEach((elem) => {
    res.keys.push(elem.getAttribute("href"));
    res.all.push(elem.textContent.replaceAll(" • Chapter ", ""));
  });
  return res;
};
export const getQuestions = async (data: data_) => {
  let res = { contents: [], all: [], categories: [] };
  const data_: NodeListOf<Element> = await getDOMFor(
    shaalaaBase + data.chapters.keys[data.chapters.selected - 1],
    `#content .textbook_solutions_wrap .qp_result_data`
  );
  data_.forEach((elem) => {
    res.categories.push(elem.childNodes[0].textContent);
    res.all.push(
      elem.innerHTML
        .replaceAll('src="/images/', `src="${shaalaaBase}/images/`)
        .replaceAll("|", "•")
    );
    res.contents.push(
      (elem.childNodes[2].firstChild as Element)
        .getAttribute("href")
        .replaceAll(
          "/question-bank-solutions/",
          `${shaalaaBase}/question-bank-solutions/`
        )
    );
  });
  return res;
};
export const getAnswers = async (data: data_) => {
  let answers: Array<Array<string>> = [];
  let concepts: Array<string> = [];
  for (const a of data.questions.contents) {
    const data = await getDOMFor(a, `#content .grid_col_left`);
    const data_ = await data[0].querySelectorAll(".qbq_text_solution");
    const data__ = await data[0].querySelectorAll(
      ".noselect + .block:not(.qbq_text_solution, .qbq_text_notes)"
    );
    let content = "";
    data__.forEach((a) => {
      content = content + " " + a.textContent.replaceAll("Concept: ", "");
    });
    concepts.push(content);

    let answer: Array<string> = [];
    data_.forEach((elem) =>
      answer.push(
        elem.innerHTML.replaceAll(
          'src="/images/',
          `src="${shaalaaBase}/images/`
        )
      )
    );
    answers.push(answer);
  }
  return { answers, concepts };
};
