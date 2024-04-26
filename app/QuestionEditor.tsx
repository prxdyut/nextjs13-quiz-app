import React, { useEffect } from "react";
import { useOptions } from "../providers/options";
import JoditEditor from "jodit-react";
import { Box, Button, Stack } from "@mui/material";
import { useSelected } from "../providers/selected";
import { useQuestionPaper } from "../providers/question_paper";
import { addQuestion, changeQuestion, getQuestion } from "./helpers";

export default function QuestionEditor() {
  const { options, setOptions } = useOptions();
  const { selected, setSelected } = useSelected();
  const { questionPaper, setQuestionPaper } = useQuestionPaper();

  const editor = React.useRef(null);
  const [content, setContent] = React.useState("");
  const placeholder = "Write Question";
  const config = {
    readonly: false,
    placeholder: placeholder || "Start typings...",
  };
  const location = selected.question.location;

  const onClick = () => {
    if (selected.question.change) {
      setQuestionPaper((_) => changeQuestion(_, location as number[], content));
    } else {
      setQuestionPaper((_) => addQuestion(_, location as number[], content));
    }
    setOptions((_) => ({ ..._, questionDrawer: false }));
  };
    const q = getQuestion(questionPaper, location as number[]);
  useEffect(() => {
    setContent(q)
  }, [location]);


  return (
    <Stack
      spacing={2}
      sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
    >
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        // @ts-ignore
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {}}
      />
      <Button variant="contained" onClick={onClick}>
        Save
      </Button>
    </Stack>
  );
}
