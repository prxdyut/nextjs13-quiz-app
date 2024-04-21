"use client";
import { Autocomplete, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { default_ } from "./consts";
import { set_ } from "./types";
import { data_ } from "./types";
import { useData } from "../providers/data";

export function Class_() {
  const { data, setData } = useData();
  return (
    <Autocomplete
      disablePortal
      onChange={(_e: SyntheticEvent, newValue: string) => {
        const index = data.class.all.indexOf(newValue);
        setData(
          (_: data_): data_ => ({
            ..._,
            class: { ..._.class, selected: index + 1 },
            books: default_,
            chapters: default_,
            questions: default_,
            answers: [],
            concepts: [],
            answerType: ''
          })
        );
      }}
      fullWidth
      value={data.class.all[data.class.selected - 1] || ""}
      options={data.class.all}
      renderInput={(params) => <TextField {...params} label="Class" />} />
  );
}
