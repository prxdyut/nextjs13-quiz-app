"use client";
import { Box, Stack, Typography } from "@mui/material";
import { QuestionComponent } from "./QuestionComponent";
import { SectionComponent } from "./SectionComponent";
import { IoIosAddCircleOutline } from "react-icons/io";

// Component to render the main question or paper
export const MainQuestionComponent = ({ mainQuestion }) => {
  return (
    <Box sx={{ pb: 3 }}>
      <Typography className="main-question-title">
        {mainQuestion.id}. {mainQuestion.title}
      </Typography>
      <Stack sx={{ pl: 4, pt: 1 }} spacing={2}>
        {mainQuestion.sections &&
          mainQuestion.sections.map((section) => (
            <SectionComponent key={section.id} section={section} />
          ))}
        {mainQuestion.questions &&
          mainQuestion.questions.map((question) => (
            <QuestionComponent key={question.id} question={question} />
          ))}
      </Stack>
      <Box
        sx={{
          width: "100%",
          height: 160,
          background: "#e8e8e8",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IoIosAddCircleOutline color="grey" size={64} />
      </Box>
    </Box>
  );
};
