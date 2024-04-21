"use client";
import { Autocomplete, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { default_ } from "./consts";
import { set_ } from "./types";
import { data_ } from "./types";
import { useData } from "../providers/data";

export function Categories() {
  const { data, setData } = useData();
  return (
    <Autocomplete
      disablePortal
      onChange={(_e: SyntheticEvent, newValue: string) => {
        const index = data.categories.all.indexOf(newValue);
        setData((_) => ({
          ..._,
          categories: { ..._.categories, selected: index + 1 },
          books: default_,
          class: default_,
          chapters: default_,
          questions: default_,
          answers: [],
          concepts: [],
          answerType: "",
        }));
      }}
      fullWidth
      value={data.categories.all[data.categories.selected - 1] || ""}
      options={data.categories.all}
      renderInput={(params) => <TextField {...params} label="Category" />}
    />
  );
}
