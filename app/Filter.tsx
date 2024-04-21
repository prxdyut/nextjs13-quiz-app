"use client";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
} from "@mui/material";
import React, { ChangeEvent, useEffect } from "react";
import { useOptions } from "../providers/options";
import { useData } from "../providers/data";
import { solution_ } from "./types";

export function Filter() {
  const { data, setData } = useData();
  const { options, setOptions } = useOptions();

  const showAnswers: boolean =
    data.answers.length && Boolean(options.showAnswers);
  const toggleShowAnswers = (event: ChangeEvent<HTMLInputElement>) =>
    setOptions((_) => ({
      ..._,
      showAnswers: event.target.checked,
    }));

  const filter = options.filter;
  const setFilter = (event: SelectChangeEvent) => {
    setOptions((_) => ({ ..._, filter: event.target.value }));
  };
  const showOn = (value: solution_) => data.answerType == value;
  useEffect(() => {
    setOptions((_) => ({ ..._, filter: "0" }));
  }, [data]);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4
      }}
    >
      <FormGroup
        sx={{
          mr: -1,
        }}
      >
        <FormControlLabel
          control={
            <Switch checked={showAnswers} onChange={toggleShowAnswers} />
          }
          label="Show Answers"
        />
      </FormGroup>

      <FormControl
        sx={{
          minWidth: "6rem",
          float: "right",
        }}
      >
        <InputLabel id="filter">Filter</InputLabel>
        <Select label="Filter" id="filter" value={filter} onChange={setFilter}>
          <MenuItem value={"0"} disabled={filter == "0"}>
            All
          </MenuItem>
          {showOn("Textbook Solutions") && (
            <MenuItem value={"1"}>Question Type</MenuItem>
          )}
          {showOn("Textbook Solutions") && (
            <MenuItem value={"2"}>Question Number</MenuItem>
          )}
          {showOn("Textbook Solutions") && (
            <MenuItem value={"3"}>Page Number</MenuItem>
          )}
          {showOn("Important Solutions") && (
            <MenuItem value={"4"}>Repeat Times</MenuItem>
          )}
          {(showOn("Textbook Solutions") || showOn("Important Solutions")) && (
            <MenuItem value={"5"}>Concept Wise</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
