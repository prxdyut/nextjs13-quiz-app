"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
} from "@mui/material";
import React from "react";
import { MathJax } from "better-react-mathjax";
import { set_ } from "./types";
import { data_ } from "./types";

export function Questions({
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
        <Box
          key={index}
          sx={{
            fontSize: "1.1rem",
          }}
          onClick={() => {
            // setQuestions((_) => ({ ..._, selected: index + 1 }));
          }}
        >
          <Box sx={{ display: "flex" }}>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Select" />
            </FormGroup>
          </Box>
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
                key={i}
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
        </Box>
      ))}
    </Stack>
  );
}
