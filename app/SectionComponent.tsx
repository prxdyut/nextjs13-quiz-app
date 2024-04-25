"use client";
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { QuestionComponent } from "./QuestionComponent";
import { useOptions } from "../providers/options";
import { exampleQuestionPaper } from "../providers/data";
import { useEffect, useState } from "react";
import { Section_ } from "./types";
import { useSelected } from "../providers/selected";
import { useQuestionPaper } from "../providers/question_paper";
import { deleteSection, moveSection } from "./helpers";
import { IoAddCircleOutline, IoChevronDownCircle } from "react-icons/io5";
import {
  MdAdd,
  MdArrowDownward,
  MdArrowUpward,
  MdDelete,
  MdEdit,
} from "react-icons/md";

export const SectionComponent = ({
  section,
  level,
  location,
  index,
}: {
  section: Section_;
  level: number;
  location: number[];
  index: number;
}) => {
  const { options, setOptions } = useOptions();
  const { selected, setSelected } = useSelected();
  const [data, setData] = useState<Section_[]>(exampleQuestionPaper);
  const { setQuestionPaper, questionPaper } = useQuestionPaper();

  const add = () => {
    setOptions((_) => ({ ..._, sectionDrawer: true }));
    setSelected((_) => ({
      ..._,
      section: { ..._.section, location, edit: false },
    }));
  };
  const edit = () => {
    setOptions((_) => ({ ..._, sectionDrawer: true }));
    setSelected((_) => ({
      ..._,
      section: { ...section, location, edit: true },
    }));
  };

  const del = () => setQuestionPaper((_) => deleteSection(_, location));
  const up = () => setQuestionPaper((_) => moveSection(_, location, -1));
  const down = () => setQuestionPaper((_) => moveSection(_, location, +1));

  const question = () => {
    setOptions((_) => ({ ..._, questionDrawer: true }));
    setSelected((_) => ({
      ..._,
      question: { ..._.question, location, edit: false },
    }));
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
    "Section",
    { label: "Add", icon: MdAdd, fn: add },
    { label: "Edit", icon: MdEdit, fn: edit },
    { label: "Move Up", icon: MdArrowUpward, fn: up },
    { label: "Move Down", icon: MdArrowDownward, fn: down },
    { label: "Delete", icon: MdDelete, fn: del },
    "Question",
    { label: "Add", icon: MdAdd, fn: question },
  ];
  return (
    <Box>
      <Typography
        className="section-title"
        sx={{
          px: 1,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          "&:hover": {
            bgcolor: "#0000001a",
          },
        }}
      >
        <div>
          {section.id}. {section.title}
        </div>

        <div>
          <Button onClick={handleClick}>
            <span style={{ fontSize: 12 }}>OPTIONS</span>
          </Button>
          &nbsp;
          {`[${section.marks}]`}
        </div>
      </Typography>
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
      <Stack
        spacing={2}
        sx={{
          pl: 4,
          py:
            (section.questions.length == section.sections.length) == true
              ? 1
              : 0,
        }}
      >
        {section.questions &&
          section.questions.map((question, index) => (
            <QuestionComponent
              location={[...location, index]}
              key={question.id}
              question={question}
            />
          ))}

        {section.sections &&
          section.sections.map((section, index) => {
            return (
              <SectionComponent
                index={index}
                location={[...location, index]}
                level={level + 1}
                key={section.id}
                section={section}
              />
            );
          })}
      </Stack>
    </Box>
  );
};
