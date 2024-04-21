"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { MathJax } from "better-react-mathjax";
import { filterValue_, options_, selected_, set_ } from "./types";
import { data_ } from "./types";
import { useData } from "../providers/data";
import { uniqueValue } from "./helpers";
import { useOptions } from "../providers/options";
import { IoChevronDown } from "react-icons/io5";
import { useSelected } from "../providers/selected";

export function Questions() {
  const { data } = useData();
  const { options } = useOptions();

  const filterValue = (val: number | string, data: data_): filterValue_[] => {
    const questionTypes = uniqueValue(
      data.questions?.categories?.map((_: string) => _.split(" | ")[0])
    );
    const questionNumbers = uniqueValue(
      data.questions?.categories?.map((_: string) => _.split(" | ")[1])
    );
    const PageNumbers = uniqueValue(
      data.questions?.categories?.map((_: string) => _.split(" | ")[2])
    );
    const repeatTimes = uniqueValue(
      data.questions?.categories?.map((_: string) => _)
    );
    const TopicWise = uniqueValue(data.concepts);

    const dataObj = {
      1: questionTypes.map((val) => ({
        label: val,
        questions: data.questions.all.filter((_) => _.includes(val)),

        answers: data.answers.filter((ans, i) =>
          data.questions.all[i].includes(val)
        ),
      })),
      2: questionNumbers.map((val) => ({
        label: val,
        questions: data.questions.all.filter((_) => _.includes(val)),

        answers: data.answers.filter((ans, i) =>
          data.questions.all[i].includes(val)
        ),
      })),
      3: PageNumbers.map((val) => ({
        label: val,
        questions: data.questions.all.filter((_) => _.includes(val)),
        answers: data.answers.filter((ans, i) =>
          data.questions.all[i].includes(val)
        ),
      })),
      4: repeatTimes.map((val) => ({
        label: val,
        questions: data.questions.all.filter((_) => _.includes(val)),
        answers: data.answers.filter((ans, i) =>
          data.questions.all[i].includes(val)
        ),
      })),
      5: TopicWise.map((val) => ({
        label: val,
        questions: data.questions.all.filter(
          (que, i) => data.concepts[i] == val
        ),
        answers: data.answers.filter((que, i) => data.concepts[i] == val),
      })),
    };
    return dataObj[val];
  };

  const showFiltered = Boolean(Number(options.filter));

  if (showFiltered)
    return (
      <Stack gap={0} divider={<Divider />} sx={{ mx: 1 }} className="answer">
        {filterValue(options.filter, data).map((filter, i) => (
          <Accordion
            key={i}
            elevation={0}
            slotProps={{
              transition: {
                unmountOnExit: true,
                timeout: 250,
              },
            }}
          >
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                mx: 0,
                px: 0,
                borderRadius: 2,
                fontWeight: 600,
              }}
              expandIcon={<IoChevronDown />}
            >
              {filter.label}
            </AccordionSummary>
            <AccordionDetails sx={{ px: 1 }}>
              <Stack gap={2} sx={{ py: 2 }} divider={<Divider />}>
                {filter.questions?.map((question, index) => (
                  <Question
                    question={question}
                    answers={filter.answers[index]}
                  />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    );

  return (
    <Stack gap={2} sx={{ py: 2 }} divider={<Divider />}>
      {data.questions.all.map((q, index) => (
        <Question key={index} question={q} answers={data.answers[index]} />
      ))}
    </Stack>
  );
}

export default function Question({
  answers,
  question,
}: {
  answers: string[];
  question: string;
}) {
  const { options, setOptions } = useOptions();
  const { data, setData } = useData();
  const { selected, setSelected } = useSelected();

  const select =
    selected.length && selected?.find((_) => _.question == question);
  const index = data.questions.all.indexOf(question);

  const toggleSelect = () => {
    select
      ? setSelected((_) => _.filter((_) => _.question != question))
      : setSelected((_) => [
          ..._,
          {
            question,
            config: {
              category: data.categories.selected,
              class: data.class.selected,
              book: data.books.selected,
              answerType: data.answerType,
              chapter: data.chapters.selected,
              index,
            },
          },
        ]);
  };

  return (
    <Box
      sx={{
        fontSize: "1.1rem",
        // my:4
      }}
      onClick={() => {}}
    >
      <FormControl>
        <FormControlLabel
          control={
            <Checkbox checked={Boolean(select)} onChange={toggleSelect} />
          }
          label={"Select"}
        />
      </FormControl>
      <Box
        sx={{
          overflow: "auto",
        }}
      >
        <MathJax inline dynamic>
          <div
            dangerouslySetInnerHTML={{
              __html: question,
            }}
            className="answer"
          />
        </MathJax>
      </Box>
      <Button onClick={() => navigator.clipboard.writeText(question)}>
        Copy to Clipboard
      </Button>
      {options.showAnswers &&
        answers?.map((ans, i) => (
          <Accordion
            key={i}
            elevation={0}
            slotProps={{
              transition: {
                unmountOnExit: true,
              },
            }}
            sx={{
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                padding: 0,
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                },
              }}
            >
              <Button variant="contained">
                View Solution {answers.length == 1 ? "" : i + 1}
              </Button>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                overflow: "auto",
              }}
            >
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
    </Box>
  );
}
