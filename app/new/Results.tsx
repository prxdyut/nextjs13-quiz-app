"use client";
import { FiSearch } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import {
  Box,
  Collapse, FormControl,
  FormControlLabel,
  FormGroup,
  IconButton, InputAdornment,
  InputLabel,
  MenuItem, Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
  useAutocomplete
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { FilteredResults } from "./FilteredResults";
import { set_ } from "./types";
import { data_ } from "./types";

export function Results({ data, set }: { data: data_; set: set_; }) {
  const {
    getRootProps, getInputLabelProps, getInputProps, getListboxProps, getOptionProps, groupedOptions,
  } = useAutocomplete({
    options: data.questions.all,
    disableCloseOnSelect: true,
  });
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <Stack gap={1}>
      {data.questions.all.length > 0 && (
        <>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch size={20} />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton onClick={() => setValue("")}>
                  {value && <CgClose />}
                </IconButton>
              ),
            }}
            placeholder="Search"
            inputProps={getInputProps()}
            fullWidth />
        </>
      )}

      <Collapse in={!(getInputProps().value == "")}>
        <Typography sx={{ mt: 2 }} variant="overline">
          Found {groupedOptions.length} results
        </Typography>
      </Collapse>
      {data.questions.all.length > 0 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <>
            <FormGroup sx={{ ml: 2 }}>
              <FormControlLabel
                control={<Switch
                  checked={checked}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setChecked(event.target.checked);
                  }} />}
                label="Show Answers" />
            </FormGroup>
          </>
          <FormControl sx={{ minWidth: "6rem", float: "right" }}>
            <InputLabel id="filter">Filter</InputLabel>
            <Select
              label="Filter"
              id="filter"
              value={filter}
              onChange={(event: SelectChangeEvent) => {
                setFilter(event.target.value as string);
              }}
            >
              <MenuItem value={""} disabled={filter == ""}>
                All
              </MenuItem>
              <MenuItem value={1}>Question Type</MenuItem>
              <MenuItem value={2}>Question Number</MenuItem>
              <MenuItem value={3}>Page Number</MenuItem>
              <MenuItem value={4}>Topic Wise</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
      {groupedOptions.length > 0 ? (
        // @ts-ignore
        <Box sx={{ my: 2, mx: 1 }} {...getListboxProps()}>
          <FilteredResults
            data={{
              ...data,
              questions: {
                all: groupedOptions as string[],
                selected: data.questions.selected,
              },
            }}
            filter={filter}
            checked={checked}
          ></FilteredResults>
        </Box>
      ) : (
        <Box sx={{ my: 2, mx: 1 }}>
          <FilteredResults
            data={data}
            filter={filter}
            checked={checked}
          ></FilteredResults>
        </Box>
      )}
    </Stack>
  );
}
