"use client";
import { FiSearch } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import {
  Collapse,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useAutocomplete,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fade,
} from "@mui/material";
import React, { useState } from "react";
import { set_, data_, selected_ } from "./types";
import { Questions } from "./Questions";
import { uniqueValue } from "./helpers";
import { IoChevronDown } from "react-icons/io5";
import { useData } from "../providers/data";
import { useOptions } from "../providers/options";

export function Search() {
  const { data, setData } = useData();
  const { options, setOptions } = useOptions();

  const { getInputProps, groupedOptions } = useAutocomplete({
    options: data.questions.all,
    disableCloseOnSelect: true,
  });

  const value = options.search;
  const setValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOptions((_) => ({ ..._, search: event.target.value }));
  };
  const resetValue = () => {
    setOptions((_) => ({ ..._, search: "" }));
  };

  return (
    <Stack gap={1}>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FiSearch size={20} />
            </InputAdornment>
          ),
          endAdornment: (
            <IconButton onClick={resetValue}>{value && <CgClose />}</IconButton>
          ),
        }}
        placeholder="Search"
        value={value}
        onChange={setValue}
        inputProps={getInputProps()}
        fullWidth
      />
      <Collapse in={!(value == "")}>
        <Typography sx={{ mt: 2 }} variant="overline">
          Found {groupedOptions.length} results
        </Typography>
      </Collapse>
    </Stack>
  );
}
