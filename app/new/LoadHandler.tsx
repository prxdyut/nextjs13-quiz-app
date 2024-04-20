"use client";
import {
  Box,
  CircularProgress, Typography
} from "@mui/material";
import React from "react";
import { data_ } from "./types";

export function LoadHandler({ data }: { data: data_; }) {
  return (
    <Box>
      {data.categories.all.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />{" "}
          <Typography variant="overline">Loading Categories</Typography>
        </Box>
      ) : null}
      {data.categories.selected && data.books.all.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />{" "}
          <Typography variant="overline">Loading Books</Typography>
        </Box>
      ) : null}

      {data.books.selected && data.chapters.all.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />{" "}
          <Typography variant="overline">Loading Chapters</Typography>
        </Box>
      ) : null}
      {data.chapters.selected && data.questions.all.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />{" "}
          <Typography variant="overline">Loading Questions</Typography>
        </Box>
      ) : null}
      {data.questions.all.length != 0 && data.answers.length == 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
          }}
        >
          <CircularProgress size={20} />{" "}
          <Typography variant="overline">Loading Answers</Typography>
        </Box>
      ) : null}
    </Box>
  );
}
