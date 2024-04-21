"use client";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { default_ } from "./consts";
import { set_ } from "./types";
import { data_ } from "./types";
import { useData } from "../providers/data";

export function Books() {
  const { data, setData } = useData();
  return (
    <Autocomplete
      disablePortal
      onChange={(e, newValue) => {
        const index = data.books.all.indexOf(newValue);
        setData(
          (_: data_): data_ => ({
            ..._,
            books: { ..._.books, selected: index + 1 },
            chapters: default_,
            questions: default_,
            answers: [],
            concepts: [],
            answerType: ''
          })
        );
      }}
      fullWidth
      value={data.books.all[data.books.selected - 1] || ""}
      options={data.books.all}
      renderInput={(params) => <TextField {...params} label="Book" />} />
  );
}
