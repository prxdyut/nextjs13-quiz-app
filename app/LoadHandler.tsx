"use client";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import { data_ } from "./types";
import { CgClose } from "react-icons/cg";
import { Snack } from "./Snack";

export function LoadHandler({
  data,
  error,
}: {
  data: data_;
  error: false | Error;
}) {
  return (
    <Box sx={{ display: "flex", minHeight: 32 }}>
      
      <Snack
        open={Boolean(error) && data.categories.all.length == 0}
        message="Loading Categories"
      />
      <Snack
        open={
          Boolean(error) &&
          data.categories.selected &&
          data.class.all.length == 0
        }
        message="Loading Class"
      />
      <Snack
        open={
          Boolean(error) &&
          data.class.selected &&
          data.categories.selected &&
          data.books.all.length == 0
        }
        message="Loading Books"
      />
      <Snack
        open={
          !Boolean(error) &&
          data.books.selected &&
          data.answerType != "" &&
          data.chapters.all.length == 0
        }
        message="Loading Chapters"
      />
      <Snack
        open={
          !Boolean(error) &&
          data.chapters.selected &&
          data.questions.all.length == 0
        }
        message="Loading Questions"
      />
      <Snack
        open={
          !Boolean(error) &&
          data.chapters.selected &&
          !data.questions.all.length &&
          data.answers.length == 0
        }
        message="Loading Answers"
      />
    </Box>
  );
}
