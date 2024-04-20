"use client";
import { Button, IconButton } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { Snack } from "./Snack";
import { CgClose } from "react-icons/cg";

export function ErrorHandler({error, set}: {
  error: false | Error;
  set: Dispatch<SetStateAction<false | Error>>;
}) {
  return (
    <Snack
      open={Boolean(error)}
      message={error.toString()}
      sx={{
        zIndex: 999,
      }}
      action={
        <React.Fragment>
          <Button onClick={() => window.location.reload()}>Reload</Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={(event: React.SyntheticEvent | Event, reason?: string) => {
              if (reason === "clickaway") {
                return;
              }

              set(false);
            }}
          >
            <CgClose />
          </IconButton>
        </React.Fragment>
      }
    />
  );
}
