import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useData } from "../providers/data";
import { useSelected } from "../providers/selected";
import { useOptions } from "../providers/options";
import { useQuestionPaper } from "../providers/question_paper";
import { addSection, editSection } from "./helpers";

export function Section() {
  const { selected, setSelected } = useSelected();
  const { options, setOptions } = useOptions();
  const { questionPaper, setQuestionPaper } = useQuestionPaper();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [marks, setMarks] = useState("");

  const onSubmit = () => {
    if (!id && !title) return;

    const newData = { id, title,marks };
    const location = selected.section.location;

    setTitle("");
    setId("");
    setMarks("");

    setSelected((_) => ({
      ..._,
      section: { ..._.section, ...newData, edit: false },
    }));

    if (selected.section.edit) {
      setQuestionPaper((_) => editSection(_, location, newData));
    } else {
      setQuestionPaper((_) => addSection(_, location, newData));
    }

    setOptions((_) => ({ ..._, sectionDrawer: false }));
  };

  useEffect(() => {
    if (selected.section.edit) {
      setTitle(selected.section.title);
      setId(selected.section.id);
      setMarks(selected.section.marks);
    } else {
      setTitle("");
      setId("");
      setMarks("");
    }
  }, [selected]);

  return (
    <Stack sx={{ py: 2 }} spacing={2}>
      <Typography variant="h6">
        {selected.section.edit ? "Edit" : "New"} Section
      </Typography>
      <TextField
        id="id"
        name="id"
        label="Id"
        value={id}
        onChange={(e) => setId(e.target.value)}
        InputLabelProps={{ shrink: Boolean(id) }}
      />
      <TextField
        id="marks"
        name="marks"
        label="Marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        InputLabelProps={{ shrink: Boolean(marks) }}
      />
      <TextField
        id="title"
        name="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        InputLabelProps={{ shrink: Boolean(title) }}
      />
      <Box textAlign={"end"}>
        <Button variant="contained" type="submit" onClick={onSubmit}>
           {selected.section.edit ? "Save" : "Create"}
        </Button>
      </Box>
    </Stack>
  );
}
