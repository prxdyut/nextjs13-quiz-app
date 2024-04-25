"use client";
import { Box, Button, Container, Stack } from "@mui/material";
import { MainQuestionComponent } from "./MainQuestionComponent";
import { SectionComponent } from "./SectionComponent";
import { useQuestionPaper } from "../providers/question_paper";
import { useOptions } from "../providers/options";
import { useSelected } from "../providers/selected";

export const QuestionPaper = () => {
  const { questionPaper, setQuestionPaper } = useQuestionPaper();
  const { selected, setSelected } = useSelected();
  const { options, setOptions } = useOptions();

  const clickedSection = () => {
    setOptions((_) => ({ ..._, sectionDrawer: true }));
    setSelected((_) => ({ ..._, section: { ..._.section, location: [-1] } }));
  };

  return (
    <Container sx={{ minWidth: 800, width: "100%", py:16 }} className='question-paper'>
      <Button onClick={clickedSection}>Add Section</Button>
      <Stack sx={{ pl: 2 }} spacing={2}>
        {questionPaper.map((mainQuestion, index) => (
          <SectionComponent
          index={index}
            level={0}
            location={[index]}
            key={mainQuestion.id}
            section={mainQuestion}
          />
        ))}
      </Stack>
    </Container>
  );
};
