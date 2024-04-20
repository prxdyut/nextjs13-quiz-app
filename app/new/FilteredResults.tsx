"use client";
import { IoChevronDown } from "react-icons/io5";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box, Fade, Stack
} from "@mui/material";
import React from "react";
import { Questions } from "./Questions";
import { uniqueValue } from "./helpers";
import { data_ } from "./types";

export function FilteredResults({
  data, filter, checked,
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
                  set={() => { }} />
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
                  set={() => { }} />
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
                  set={() => { }} />
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
                  set={() => { }} />
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      )}
      {filter == "" && (
        <Questions checked={checked} data={data} set={() => { }} />
      )}
    </Box>
  );
}
