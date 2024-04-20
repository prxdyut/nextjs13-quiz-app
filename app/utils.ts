import { shaalaaTextSol, shaalaaBase } from "./consts";

import {
  capitalizeFirstLetter,
  findCommonWords,
  getDOMFor,
  removeWordsFromString,
  uniqueValue,
} from "./helpers";
import { data_ } from "./types";

export const getBookCategory = async (data: data_) => {
  let res = { all: [], contents: [] };
  const data_: NodeListOf<Element> = await getDOMFor(
    shaalaaTextSol,
    "#content .grid_right .grid_col_left .block.clearfix h2"
  );
  data_.forEach((elem) => {
    res.all.push(elem.textContent.split(" for ")[0]);
    res.contents.push(elem.textContent);
  });
  res.all = uniqueValue(res.all);
  return res;
};
export const getClass = async (data: data_) => {
  let res = { all: [] };
  const data_: NodeListOf<Element> = await getDOMFor(
    shaalaaTextSol,
    "#content .grid_right .grid_col_left .block.clearfix h2"
  );
  data_.forEach((elem) => {
    if (
      elem.textContent.includes(
        data.categories.all[data.categories.selected - 1]
      )
    )
      res.all.push(elem.textContent.split(" for ")[1]);
  });
  return res;
};
export const getBooks = async (data: data_) => {
  const index =
    data.categories.contents.indexOf(
      data.categories.contents.find(
        (value) =>
          value.includes(data.class.all[data.class.selected - 1]) &&
          value.includes(data.categories.all[data.categories.selected - 1])
      )
    ) + 1;
  let res = { keys: [], all: [] };
  const data_: NodeListOf<Element> = await getDOMFor(
    shaalaaTextSol,
    `#content .grid_right .grid_col_left .block.clearfix:nth-of-type(${index}) a`
  );

  data_.forEach((elem) => {
    res.keys.push(elem.getAttribute("href"));
    res.all.push(
      elem.textContent
        .replace(data.categories.all[data.categories.selected] + " for ", "")
        .toLowerCase()
    );
  });
  const commonWords: string[] = findCommonWords(res.all);
  res.all =
    res.all.length > 1
      ? res.all.map((title) =>
          capitalizeFirstLetter(removeWordsFromString(title, commonWords))
        )
      : res.all.map((_) => capitalizeFirstLetter(_));
  return res;
};

export const getImportantChapters = async (data: data_) => {
  let res = { keys: [], all: [] };
  let data_: NodeListOf<Element>;
  data_ = await getDOMFor(
    shaalaaBase + data.books.keys[data.books.selected - 1],
    `*`
  );
  const mainUrl = data_[0]
    .querySelector(".header_course_unit_name a")
    .getAttribute("href")
    .replaceAll("/cu/", `/search-important-solutions/`);

  const subjectNumber = data_[0]
    .querySelector("#notifications + script")
    .textContent.split('"subject_id":')
    .flatMap((_) => _.split(',"subject_name"'))[1];

  const subjectId = data_[0]
    .querySelector("#notifications + script")
    .textContent.split('"subject_url":"')
    .flatMap((_) => _.split('","subject_url2"'))[1];

  const categoriesFetchUrl = `${mainUrl}?subjects=${subjectId}_${subjectNumber}`;
  data_ = await getDOMFor(
    shaalaaBase + categoriesFetchUrl,
    `.qp_filter_outer.qp_filter_topics label`
  );
  data_.forEach((elem, key) => {
    res.keys.push(
      categoriesFetchUrl +
        "&topics=" +
        elem.querySelector("input").getAttribute("data-value")
    );
    res.all.push(key + 1 + ": " + elem.textContent.trim());
  });

  return res;
};

export const getTextbookChapters = async (data: data_) => {
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

export const getImportantQuestions = async (data: data_) => {
  let res = { contents: [], all: [], categories: [] };

  const data_: NodeListOf<Element> = await getDOMFor(
    shaalaaBase + data.chapters.keys[data.chapters.selected - 1],
    `#content .textbook_solutions_wrap .qp_result_data, #content .qp_result_data.qp_result_qbq`
  );
  data_.forEach((elem) => {
    res.categories.push(elem.childNodes[1].textContent);
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
export const getTextbookQuestions = async (data: data_) => {
  let res = { contents: [], all: [], categories: [] };

  const data_: NodeListOf<Element> = await getDOMFor(
    shaalaaBase + data.chapters.keys[data.chapters.selected - 1],
    `#content .textbook_solutions_wrap .qp_result_data, #content .qp_result_data.qp_result_qbq`
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

  await data.questions.contents.forEach(async (a) => {
    const data = await getDOMFor(a, `#content .grid_col_left`);
    const data_ = data[0].querySelectorAll(".qbq_text_solution");
    const data__ = data[0].querySelectorAll(
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
  });
  return { answers, concepts };
};
