"use client";
import { FiSearch } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import {
  Box,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Typography,
  useAutocomplete,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Fade,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { set_, data_, selected_ } from "./types";
import { Questions } from "./Questions";
import { uniqueValue } from "./helpers";
import { IoChevronDown } from "react-icons/io5";
import { useData } from "../providers/data";

function FilteredResults({
  filter,
  checked,
}: {
  filter: string;
  checked: boolean;
}) {
  const { data, setData } = useData();

  const filterValue = (val: number | string, data: data_) => {
    const questionTypes = uniqueValue(
      data.questions?.categories?.map((_: string) => _.split(" | ")[0].trim())
    );
    const questionNumbers = uniqueValue(
      data.questions?.categories?.map((_: string) => _.split(" | ")[1].trim())
    );
    const PageNumbers = uniqueValue(
      data.questions?.categories?.map((_: string) => _.split(" | ")[2].trim())
    );
    const TopicWise = uniqueValue(data.concepts);

    const dataObj = {
      1: questionTypes.map((val) => {
        console.log(
          data.answers.filter((ans, i) => data.questions.all[i].includes(val))
        );
        return {
          label: val,
          questions: {
            ...data.questions,
            all: data.questions.all.filter((_) => _.includes(val)),
          },
          answers: data.answers.filter((ans, i) =>
            data.questions.all[i].includes(val)
          ),
        };
      }),
      2: questionNumbers.map((val) => ({
        questions: {
          ...data.questions,
          all: data.questions.all.filter((_) => _.includes(val)),
        },
        answers: data.answers.filter((ans, i) =>
          data.questions.all[i].includes(val)
        ),
      })),
      3: PageNumbers.map((val) => ({
        questions: {
          ...data.questions,
          all: data.questions.all.filter((_) => _.includes(val)),
        },
        answers: data.answers.filter((ans, i) =>
          data.questions.all[i].includes(val)
        ),
      })),
      4: TopicWise.map((val) => ({
        questions: {
          ...data.questions,
          all: data.questions.all.filter((que, i) => data.concepts[i] == val),
        },
        answers: data.answers.filter((que, i) => data.concepts[i] == val),
      })),
    };
    return dataObj[val];
  };

  console.log(data);

  return (
    <Box
      sx={{
        my: 0,
        mx: 1,
      }}
    >
      <Stack gap={1} className="filtered">
        <Accordion
          elevation={0}
          slots={{ transition: Fade }}
          slotProps={{
            transition: {
              unmountOnExit: true,
              timeout: 250,
            },
          }}
        >
          <AccordionSummary
            sx={{
              mx: 0,
              px: 0,
              borderRadius: 2,
              fontWeight: 600,
            }}
            expandIcon={<IoChevronDown />}
          >
            type
          </AccordionSummary>
          <AccordionDetails
            sx={{
              mx: 0,
              px: 0,
            }}
          >
            <Questions />
          </AccordionDetails>
        </Accordion>
      </Stack>

      {/* {filter == "" && <Questions />} */}
    </Box>
  );
}
export function TextbookResults() {
  const { data, setData } = useData();
  const { getInputProps, getListboxProps, groupedOptions } = useAutocomplete({
    options: data.questions.all,
    disableCloseOnSelect: true,
  });
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <Stack gap={1}>
      <Fade in={data.questions.all.length > 0}>
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
          fullWidth
        />
      </Fade>

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
                control={
                  <Switch
                    checked={Boolean(data.answers.length) && Boolean(checked)}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setChecked(event.target.checked);
                    }}
                  />
                }
                label="Show Answers"
              />
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
              <MenuItem value={4}>Concept Wise</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
      {groupedOptions.length > 0 ? (
        // @ts-ignore
        <Box sx={{ my: 2, mx: 1 }} {...getListboxProps()}>
          <FilteredResults
            // data={{
            //   ...data,
            //   questions: {
            //     all: groupedOptions as string[],
            //     selected: data.questions.selected,
            //   },
            // }}
            filter={filter}
            checked={Boolean(checked)}
          ></FilteredResults>
        </Box>
      ) : (
        <Box sx={{ my: 2, mx: 1 }}>
          <FilteredResults
            // data={data}
            filter={filter}
            checked={Boolean(checked)}
          ></FilteredResults>
        </Box>
      )}
    </Stack>
  );
}
