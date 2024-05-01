import React, { useEffect, useState } from "react";
import { useOptions } from "../providers/options";
// import JoditEditor from "jodit-react";
import { Box, Button, Stack } from "@mui/material";
import { useSelected } from "../providers/selected";
import { useQuestionPaper } from "../providers/question_paper";
import { addQuestion, changeQuestion, getQuestion } from "./helpers";
import dynamic from "next/dynamic";
import { IJoditEditorProps } from "jodit-react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function QuestionEditor() {
  const { options, setOptions } = useOptions();
  const { selected, setSelected } = useSelected();
  const { questionPaper, setQuestionPaper } = useQuestionPaper();

  const editor = React.useRef(null);
  const [content, setContent] = React.useState("");
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  const placeholder = "Write Question";
  const config: IJoditEditorProps["config"] & {placeholder: string} = {
    readonly: false,
    placeholder: placeholder,
    height: 400,
    saveModeInStorage: true
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
    setContent(q);
  }, [location]);

  if (!client) return null;

  return (
    <Stack
      spacing={2}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
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
      <Button variant="contained" onClick={onClick} sx={{ alignSelf: "end" }}>
        Save
      </Button>
    </Stack>
  );
}
