"use client";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { data_, set_, solution_ } from "./types";
import { default_ } from "./consts";
import { useData } from "../providers/data";

export function Solution() {
  const { data, setData } = useData();
  return (
    <Autocomplete
      disablePortal
      onChange={(e, newValue: solution_) =>
        setData((_: data_): data_ => ({
          ..._,
          answerType: newValue,
          chapters: default_,
          questions: default_,
          answers: [],
          concepts: [],
        }))
      }
      fullWidth
      value={data.answerType}
      options={data.books.selected ? ["Textbook Solutions", "Important Solutions"] : []}
      renderInput={(params) => <TextField {...params} label="Type" />}
    />
  );
}
