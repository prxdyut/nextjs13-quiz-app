"use client";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { default_ } from "./consts";
import { set_ } from "./types";
import { data_ } from "./types";

export function Chapters({ data, set }: { data: data_; set: set_; }) {
  return (
    <Autocomplete
      disablePortal
      onChange={(e, newValue) => {
        const index = data.chapters.all.indexOf(newValue);
        set(
          (_: data_): data_ => ({
            ..._,
            chapters: { ..._.chapters, selected: index + 1 },
            questions: default_,
            answers: [],
            concepts: [],
          })
        );
      }}
      fullWidth
      value={data.chapters.all[data.chapters.selected - 1] || ""}
      options={data.chapters.all}
      renderInput={(params) => <TextField {...params} label="Chapter" />} />
  );
}
