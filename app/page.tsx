"use client";
import { FiSearch } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { IoChevronDown } from "react-icons/io5";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  Fade,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
  useAutocomplete,
} from "@mui/material";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";

import { MathJax, MathJaxContext } from "better-react-mathjax";

type type_ = {
  all: Array<string>;
  keys?: Array<string>;
  contents?: Array<any>;
  categories?: Array<any>;
  selected: null | number;
};

type set_ = Function;

type data_ = {
  categories: type_;
  books: type_;
  chapters: type_;
  questions: type_;
  answers: Array<Array<string>>;
  concepts: Array<string>;
};

const default_ = {
  all: [],
  selected: null,
};

const getHTML = async (url: string) => {
  const data = await fetch(url);
  return await data.text();
};

const getDOMFor = async (url: string, query: string) => {
  const data = await getHTML(url);
  const HTMLDOM = new DOMParser();
  const doc = HTMLDOM.parseFromString(data, "text/html");
  return doc.querySelectorAll(query);
};
function Categories({ data, set }: { data: data_; set: set_ }) {
  return (
    <Autocomplete
      disablePortal
      onChange={(_e: SyntheticEvent, newValue: string) => {
        const index = data.categories.all.indexOf(newValue);
        set(
          (_: data_): data_ => ({
            ..._,
            categories: { ..._.categories, selected: index + 1 },
            books: default_,
            chapters: default_,
            questions: default_,
            answers: [],
            concepts: [],
          })
        );
      }}
      fullWidth
      value={data.categories.all[data.categories.selected - 1] || ""}
      options={data.categories.all}
      renderInput={(params) => <TextField {...params} label="Category" />}
    />
  );
}
function Books({ data, set }: { data: data_; set: set_ }) {
  return (
    <Autocomplete
      disablePortal
      onChange={(e, newValue) => {
        const index = data.books.all.indexOf(newValue);
        set(
          (_: data_): data_ => ({
            ..._,
            books: { ..._.books, selected: index + 1 },
            chapters: default_,
            questions: default_,
            answers: [],
            concepts: [],
          })
        );
      }}
      fullWidth
      value={data.books.all[data.books.selected - 1] || ""}
      options={data.books.all}
      renderInput={(params) => <TextField {...params} label="Book" />}
    />
  );
}
function Chapters({ data, set }: { data: data_; set: set_ }) {
  return (
    <Autocomplete
      disablePortal
      onChange={(e, newValue) => {
        const index = data.chapters.all.indexOf(newValue);
        set(
          (_: data_): data_ => ({
            ..._,
            chapters: { ..._.chapters, selected: index + 1 },
            questions: default_,
            answers: [],
            concepts: [],
          })
        );
      }}
      fullWidth
      value={data.chapters.all[data.chapters.selected - 1] || ""}
      options={data.chapters.all}
      renderInput={(params) => <TextField {...params} label="Chapter" />}
    />
  );
}
function Questions({
  data,
  set,
  checked,
}: {
  data: data_;
  set: set_;
  checked: boolean;
}) {
  return (
    <Stack gap={4} divider={<Divider />}>
      {data.questions.all.map((q, index) => (
        <div
          key={index}
          style={{
            fontSize: "1.1rem",
          }}
          onClick={() => {
            // setQuestions((_) => ({ ..._, selected: index + 1 }));
          }}
        >
          <Box sx={{ overflow: "auto" }}>
            <MathJax inline dynamic>
              <div
                dangerouslySetInnerHTML={{
                  __html: q,
                }}
                className="answer"
              />
            </MathJax>
          </Box>
          {checked &&
            data.answers[index]?.map((ans, i) => (
              <Accordion
                elevation={0}
                slotProps={{ transition: { unmountOnExit: true } }}
                sx={{ "&:before": { display: "none" } }}
              >
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{
                    padding: 0,
                    "& .MuiAccordionSummary-content": { margin: 0 },
                  }}
                >
                  <Button variant="contained">
                    View Solution {data.answers[index].length == 1 ? "" : i + 1}
                  </Button>
                </AccordionSummary>
                <AccordionDetails sx={{ overflow: "auto" }}>
                  <MathJax inline dynamic>
                    <div
                      key={i}
                      dangerouslySetInnerHTML={{
                        __html: ans,
                      }}
                    />
                  </MathJax>
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
      ))}
    </Stack>
  );
}

function LoadHandler({ data }: { data: data_ }) {
  return (
    <Box>
      {data.categories.all.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />{" "}
          <Typography variant="overline">Loading Categories</Typography>
        </Box>
      ) : null}
      {data.categories.selected && data.books.all.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />{" "}
          <Typography variant="overline">Loading Books</Typography>
        </Box>
      ) : null}

      {data.books.selected && data.chapters.all.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />{" "}
          <Typography variant="overline">Loading Chapters</Typography>
        </Box>
      ) : null}
      {data.chapters.selected && data.questions.all.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />{" "}
          <Typography variant="overline">Loading Questions</Typography>
        </Box>
      ) : null}
      {data.questions.all.length != 0 && data.answers.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />{" "}
          <Typography variant="overline">Loading Answers</Typography>
        </Box>
      ) : null}
    </Box>
  );
}

export default function Page() {
  const shaalaaBase = "https://www.shaalaa.com";
  const shaalaaTextSol = "https://www.shaalaa.com/textbook-solutions";

  const [data, setData] = useState<data_>({
    categories: default_,
    books: default_,
    questions: default_,
    chapters: default_,
    answers: [],
    concepts: [],
  });

  const getBookCategory = async () => {
    let res = [];
    const data: NodeListOf<Element> = await getDOMFor(
      shaalaaTextSol,
      "#content .grid_right .grid_col_left .block.clearfix h2"
    );
    data.forEach((elem) => {
      res.push(elem.textContent);
    });
    return res;
  };
  const getBooks = async () => {
    let res = { href: [], text: [] };
    const data_: NodeListOf<Element> = await getDOMFor(
      shaalaaTextSol,
      `#content .grid_right .grid_col_left .block.clearfix:nth-of-type(${data.categories.selected}) a`
    );
    data_.forEach((elem) => {
      res.href.push(elem.getAttribute("href"));
      res.text.push(elem.textContent);
    });
    return res;
  };
  const getChapters = async () => {
    let res = { href: [], text: [] };
    const data_: NodeListOf<Element> = await getDOMFor(
      shaalaaBase + data.books.keys[data.books.selected - 1],
      `#content .grid_right .grid_col_left:nth-of-type(1) .block ul:nth-of-type(1) a`
    );
    data_.forEach((elem) => {
      res.href.push(elem.getAttribute("href"));
      res.text.push(elem.textContent.replaceAll(" • Chapter ", ""));
    });
    return res;
  };
  const getQuestions = async () => {
    let res = { contents: [], text: [], categories: [] };
    const data_: NodeListOf<Element> = await getDOMFor(
      shaalaaBase + data.chapters.keys[data.chapters.selected - 1],
      `#content .textbook_solutions_wrap .qp_result_data`
    );
    data_.forEach((elem) => {
      res.categories.push(elem.childNodes[0].textContent);
      res.text.push(
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

  const getAnswers = async () => {
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

  useEffect(() => {
    if (data.categories.all.length == 0) {
      getBookCategory().then((all) =>
        setData((_) => ({ ..._, categories: { ..._.categories, all } }))
      );
    }
    if (data.categories.selected && data.books.all.length == 0) {
      getBooks().then(({ text: all, href: keys }) =>
        setData((_) => ({ ..._, books: { ..._.books, all, keys } }))
      );
    }
    if (
      data.categories.selected &&
      data.books.selected &&
      data.chapters.all.length == 0
    ) {
      getChapters().then(({ text: all, href: keys }) =>
        setData((_) => ({ ..._, chapters: { ..._.chapters, all, keys } }))
      );
    }
    if (
      data.categories.selected &&
      data.books.selected &&
      data.chapters.selected &&
      data.questions.all.length == 0
    ) {
      getQuestions().then(({ text: all, contents, categories }) =>
        setData((_) => ({
          ..._,
          questions: { ..._.questions, all, contents, categories },
        }))
      );
    }
  }, [data]);

  const fetchAnswers = () => {
    if (
      data.categories.selected &&
      data.books.selected &&
      data.chapters.selected
    ) {
      getAnswers().then(({ answers, concepts }) => {
        setData((_) => ({ ..._, answers, concepts }));
      });
    }
  };
  useEffect(fetchAnswers, [data.questions]);

  const config = {
    loader: { load: ["input/asciimath", "ui/lazy"] },
  };
  return (
    <MathJaxContext config={config}>
      <Container sx={{ my: 6 }}>
        <Stack gap={2}>
          <LoadHandler data={data} />
          <Categories data={data} set={setData} />
          <Books data={data} set={setData} />
          <Chapters data={data} set={setData} />

          <Results data={data} set={() => {}} />
        </Stack>
      </Container>
    </MathJaxContext>
  );
}
function uniqueValue(exercises) {
  const uniqueExercises = new Set(exercises);
  const uniqueExercisesArray = Array.from(uniqueExercises);
  return uniqueExercisesArray;
}

function FilteredResults({
  data,
  filter,
  checked,
}: {
  data: data_;
  filter: string;
  checked: boolean;
}) {
  const questionTypes = uniqueValue(
    data.questions?.categories?.map((_: string) => _.split(" | ")[0])
  );
  const questionNumbers = uniqueValue(
    data.questions?.categories?.map((_: string) => _.split(" | ")[1])
  );
  const PageNumbers = uniqueValue(
    data.questions?.categories?.map((_: string) => _.split(" | ")[2])
  );
  const TopicWise = uniqueValue(data.concepts);
  // console.log(TopicWise)

  return (
    <Box
      sx={{
        my: 0,
        mx: 1,
      }}
    >
      {filter == "1" && (
        <Stack gap={1} className="filtered">
          {questionTypes.map((type: string) => (
            <Accordion
              elevation={0}
              slots={{ transition: Fade }}
              slotProps={{
                transition: {
                  unmountOnExit: true,
                  timeout: 250,
                },
              }}
            >
              <AccordionSummary
                sx={{
                  mx: 0,
                  px: 0,
                  borderRadius: 2,
                  fontWeight: 600,
                }}
                expandIcon={<IoChevronDown />}
              >
                {type}
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  mx: 0,
                  px: 0,
                }}
              >
                <Questions
                  checked={checked}
                  data={{
                    ...data,
                    questions: {
                      ...data.questions,
                      all: data.questions.all.filter((_) => _.includes(type)),
                    },
                  }}
                  set={() => {}}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      )}
      {filter == "2" && (
        <Stack gap={1} className="filtered">
          {questionNumbers.map((num: string) => (
            <Accordion
              elevation={0}
              slots={{ transition: Fade }}
              slotProps={{
                transition: {
                  unmountOnExit: true,
                  timeout: 250,
                },
              }}
            >
              <AccordionSummary
                sx={{
                  mx: 0,
                  px: 0,
                  borderRadius: 2,
                  fontWeight: 600,
                }}
                expandIcon={<IoChevronDown />}
              >
                {num}
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  mx: 0,
                  px: 0,
                }}
              >
                <Questions
                  checked={checked}
                  data={{
                    ...data,
                    questions: {
                      ...data.questions,
                      all: data.questions.all.filter((_) => _.includes(num)),
                    },
                  }}
                  set={() => {}}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      )}
      {filter == "3" && (
        <Stack gap={1} className="filtered">
          {PageNumbers.map((num: string) => (
            <Accordion
              elevation={0}
              slots={{ transition: Fade }}
              slotProps={{
                transition: {
                  unmountOnExit: true,
                  timeout: 250,
                },
              }}
            >
              <AccordionSummary
                sx={{
                  mx: 0,
                  px: 0,
                  borderRadius: 2,
                  fontWeight: 600,
                }}
                expandIcon={<IoChevronDown />}
              >
                {num}
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  mx: 0,
                  px: 0,
                }}
              >
                <Questions
                  checked={checked}
                  data={{
                    ...data,
                    questions: {
                      ...data.questions,
                      all: data.questions.all.filter((_) => _.includes(num)),
                    },
                  }}
                  set={() => {}}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      )}
      {filter == "4" && (
        <Stack gap={1} className="filtered">
          {TopicWise.map((__: string) => (
            <Accordion
              elevation={0}
              slots={{ transition: Fade }}
              slotProps={{
                transition: {
                  unmountOnExit: true,
                  timeout: 250,
                },
              }}
            >
              <AccordionSummary
                sx={{
                  mx: 0,
                  px: 0,
                  borderRadius: 2,
                  fontWeight: 600,
                }}
                expandIcon={<IoChevronDown />}
              >
                {__}
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  mx: 0,
                  px: 0,
                }}
              >
                <Questions
                  checked={checked}
                  data={{
                    ...data,
                    questions: {
                      ...data.questions,
                      all: data.questions.all.filter(
                        (que, i) => data.concepts[i] == __
                      ),
                    },
                    answers: data.answers.filter(
                      (que, i) => data.concepts[i] == __
                    ),
                  }}
                  set={() => {}}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      )}
      {filter == "" && (
        <Questions checked={checked} data={data} set={() => {}} />
      )}
    </Box>
  );
}

function Results({ data, set }: { data: data_; set: set_ }) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    options: data.questions.all,
    disableCloseOnSelect: true,
  });
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <Stack gap={1}>
      {data.questions.all.length > 0 && (
        <>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch size={20} />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => setValue("")}>
                  {value && <CgClose />}
                </IconButton>
              ),
            }}
            placeholder="Search"
            inputProps={getInputProps()}
            fullWidth
          />
        </>
      )}

      <Collapse in={!(getInputProps().value == "")}>
        <Typography sx={{ mt: 2 }} variant="overline">
          Found {groupedOptions.length} results
        </Typography>
      </Collapse>
      {data.questions.all.length > 0 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <>
            <FormGroup sx={{ ml: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={checked}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setChecked(event.target.checked);
                    }}
                  />
                }
                label="Show Answers"
              />
            </FormGroup>
          </>
          <FormControl sx={{ minWidth: "6rem", float: "right" }}>
            <InputLabel id="filter">Filter</InputLabel>
            <Select
              label="Filter"
              id="filter"
              value={filter}
              onChange={(event: SelectChangeEvent) => {
                setFilter(event.target.value as string);
              }}
            >
              <MenuItem value={""} disabled={filter == ""}>
                All
              </MenuItem>
              <MenuItem value={1}>Question Type</MenuItem>
              <MenuItem value={2}>Question Number</MenuItem>
              <MenuItem value={3}>Page Number</MenuItem>
              <MenuItem value={4}>Topic Wise</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
      {groupedOptions.length > 0 ? (
        // @ts-ignore
        <Box sx={{ my: 2, mx: 1 }} {...getListboxProps()}>
          <FilteredResults
            data={{
              ...data,
              questions: {
                all: groupedOptions as string[],
                selected: data.questions.selected,
              },
            }}
            filter={filter}
            checked={checked}
          ></FilteredResults>
        </Box>
      ) : (
        <Box sx={{ my: 2, mx: 1 }}>
          <FilteredResults
            data={data}
            filter={filter}
            checked={checked}
          ></FilteredResults>
        </Box>
      )}
    </Stack>
  );
}
