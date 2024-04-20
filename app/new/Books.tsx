"use client";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { default_ } from "./consts";
import { set_ } from "./types";
import { data_ } from "./types";

export function Books({ data, set }: { data: data_; set: set_; }) {
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
      renderInput={(params) => <TextField {...params} label="Book" />} />
  );
}
