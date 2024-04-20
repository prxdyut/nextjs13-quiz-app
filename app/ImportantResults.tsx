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
import React, { ChangeEvent, useState } from "react";
import { set_, data_ } from "./types";
import { Questions } from "./Questions";
import { uniqueValue } from "./helpers";
import { IoChevronDown } from "react-icons/io5";

export function FilteredResults({
  data,
  filter,
  checked,
}: {
  data: data_;
  filter: string;
  checked: boolean;
}) {
  const questionTypes = uniqueValue(
    data.questions?.categories?.map((_: string) => _.split(" | ")[0])
  );
  const TopicWise = uniqueValue(data.concepts);

  return (
    <Box
      sx={{
        my: 0,
        mx: 1,
      }}
      className='important'
    >
    {filter == "1" && (
      <Stack gap={1} className="filtered">
        {questionTypes.map((type: string) => (
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
              {type}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                mx: 0,
                px: 0,
              }}
            >
              <Questions
                checked={checked}
                data={{
                  ...data,
                  questions: {
                    ...data.questions,
                    all: data.questions.all.filter((_) => _.includes(type)),
                  },
                  answers: data.answers.filter((ans, i) =>
                    data.questions.all[i].includes(type)
                  ),
                }}
                set={() => {}}
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    )}
    {filter == "2" && (
        <Stack gap={1} className="filtered">
          {TopicWise.map((__: string) => (
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
                {__}
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  mx: 0,
                  px: 0,
                }}
              >
                <Questions
                  checked={checked}
                  data={{
                    ...data,
                    questions: {
                      ...data.questions,
                      all: data.questions.all.filter(
                        (que, i) => data.concepts[i] == __
                      ),
                    },
                    answers: data.answers.filter(
                      (que, i) => data.concepts[i] == __
                    ),
                  }}
                  set={() => {}}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      )}
      {filter == "" && (
        <Questions checked={checked} data={data} set={() => {}} />
      )}
    </Box>
  );
}
export function ImportantResults({ data, set }: { data: data_; set: set_ }) {
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    options: data.questions.all,
    disableCloseOnSelect: true,
  });
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("");
  const [checked, setChecked] = useState(false);

  return data.answerType == 'Important Solutions' ? (
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
            fullWidth
          />
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
                control={
                  <Switch
                    checked={data.answers.length && checked}
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
              <MenuItem value={1}>Repeat Times</MenuItem>
              <MenuItem value={2}>Concept Wise</MenuItem>
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
  ) : null;
}
