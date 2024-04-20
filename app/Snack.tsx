"use client";
import { Box, CircularProgress, Snackbar, SnackbarProps } from "@mui/material";
import React from "react";

export function Snack({
  message,
  open,
  loading,
  ...props
}: {
  loading?: boolean;
  message: string;
  open: boolean;
} & SnackbarProps) {
  return (
    <>
      <Snackbar
        {...props}
        open={open}
        message={
          <Box sx={{ display: "flex", gap: 2 }}>
            {loading && <CircularProgress size={20} />} {message}
          </Box>
        }
      />
    </>
  );
}
