"use client";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
} from "@mui/material";
import {
  deleteQuestion,
  moveQuestion,
  processQuestion,
  romanize,
} from "./helpers";
import { MathJax } from "better-react-mathjax";
import { Question_ } from "./types";
import { useOptions } from "../providers/options";
import { useSelected } from "../providers/selected";
import { useQuestionPaper } from "../providers/question_paper";
import { MdArrowDownward, MdArrowUpward, MdAutorenew, MdCyclone, MdDelete } from "react-icons/md";
import { useState } from "react";

// Component to render a single question
export const QuestionComponent = ({
  question,
  location,
}: {
  question: Question_;
  location: number[];
}) => {
  const { options, setOptions } = useOptions();
  const { selected, setSelected } = useSelected();
  const { setQuestionPaper, questionPaper } = useQuestionPaper();

  const del = () => {
    setQuestionPaper((_) => deleteQuestion(_, location));
    setSelected((_) => ({
      ..._,
      questions: selected.questions.filter(
        (qObject) => qObject.question != question.text
      ),
    }));
  };

  const change = () => {
    setOptions((_) => ({ ..._, questionDrawer: true }));
    setSelected((_) => ({ ..._, question: { ..._.question, location, edit: true } }));
  };

  const up = () => {
    setQuestionPaper((_) => moveQuestion(_, location, -1));
  };

  const down = () => {
    setQuestionPaper((_) => moveQuestion(_, location, +1));
  };
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const sectionOptions = [
    "Question",
    { label: "Change", icon: MdAutorenew, fn: change },
    { label: "Move Up", icon: MdArrowUpward, fn: up },
    { label: "Move Down", icon: MdArrowDownward, fn: down },
    { label: "Delete", icon: MdDelete, fn: del },
  ];
  return (
    <Box
      sx={{
        p: 1,
        pr: 0,
        display: "flex",
        justifyContent: "space-between",
        borderRadius: 1,
        "&:hover": {
          bgcolor: "#0000001a",
        },
      }}
    >
      <MathJax inline dynamic>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <span style={{ textTransform: "lowercase" }}>{`(${romanize(
            location[location.length - 1] + 1
          )})`}</span>
          .
          <div
            style={{ display: "inline" }}
            dangerouslySetInnerHTML={{ __html: processQuestion(question.text) }}
          />
        </Box>
      </MathJax>
      <Box sx={{ pr: 4.6 }}>
        <Button onClick={handleClick}>
          <span style={{ fontSize: 12 }}>OPTIONS</span>
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <List>
            {sectionOptions.map((option) =>
              typeof option == "string" ? (
                <ListItem>
                  <ListItemText secondary={option} />
                </ListItem>
              ) : (
                <ListItem disablePadding>
                  <ListItemButton onClick={option.fn}>
                    <ListItemIcon>
                      <option.icon size={24} />
                    </ListItemIcon>
                    <ListItemText primary={option.label} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Popover>
      </Box>
    </Box>
  );
};
