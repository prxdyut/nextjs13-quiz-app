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
import { selected_, set_ } from "./types";
import { data_ } from "./types";

export function Questions({
  selected,
  data,
  set,
  checked,
}: {
  selected: { data: selected_; set: set_ };
  data: data_;
  set: set_;
  checked: boolean;
}) {
  function Single({
    index,
    checked,
    data,
    q,
  }: {
    index: number;
    checked: boolean;
    data: data_;
    q: string;
  }) {
    const select = selected.data.includes(q);
    const toggle = () => {
      if (select) {
        (selected.set as Dispatch<SetStateAction<selected_>>)((_) =>
          _.filter((_) => _ != q)
        );
      } else {
        (selected.set as Dispatch<SetStateAction<selected_>>)((_) => [..._, q]);
      }
    };
    return (
      <Box
        key={index}
        sx={{
          fontSize: "1.1rem",
        }}
        onClick={() => {}}
      >
        <FormControl>
          <FormControlLabel
            onClick={toggle}
            control={<Checkbox checked={select} />}
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
                __html: q,
              }}
              className="answer"
            />
          </MathJax>
        </Box>
        {checked &&
          data.answers[index]?.map((ans, i) => (
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
                  View Solution {data.answers[index].length == 1 ? "" : i + 1}
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
  return (
    <Stack gap={4} divider={<Divider />}>
      {data.questions.all.map((q, index) => (
        <Single index={index} checked={checked} q={q} data={data} />
      ))}
    </Stack>
  );
}
