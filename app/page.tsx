"use client";
import { Box, Button, Container, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Categories } from "./Categories";
import { Books } from "./Books";
import { Chapters } from "./Chapters";
import { LoadHandler } from "./LoadHandler";
import {
  getBookCategory,
  getBooks,
  getTextbookChapters,
  getTextbookQuestions,
  getImportantQuestions,
  getAnswers,
  getImportantChapters,
  getClass,
} from "./utils";
import { default_ } from "./consts";
import {
  updateNestedState,
  shouldFetchCategories,
  shouldFetchBooks,
  shouldFetchChapters,
  shouldFetchQuestions,
  shouldFetchAnswers,
  shouldFetchClass,
} from "./helpers";
import { Solution } from "./Solution";
import { Search } from "./Search";
import { Class_ } from "./Class";
import { ErrorHandler } from "./ErrorHandler";
import { useData } from "../providers/data";
import { Questions } from "./Questions";
import { Filter } from "./Filter";
import { useSelected } from "../providers/selected";
import { exampleQuestionPaper } from "../providers/data";
import { SectionComponent } from "./SectionComponent";
import { QuestionDrawer } from "./QuestionDrawer";
import { SectionDrawer } from "./SectionDrawer";
import { Section } from "./Section";
import { useQuestionPaper } from "../providers/question_paper";
import { useOptions } from "../providers/options";
import { QuestionPaper } from "./QuestionPaper";

export default function QuestionsPage() {
  const [error, setError] = useState<false | Error>(false);
  const { data, setData } = useData();
  const { selected, setSelected } = useSelected();
  const { options, setOptions } = useOptions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (shouldFetchCategories(data)) {
          const newData = await getBookCategory(data);
          setData((prevData) =>
            updateNestedState(prevData, "categories", newData)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (shouldFetchClass(data)) {
          const newData = await getClass(data);
          setData((prevData) => updateNestedState(prevData, "class", newData));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, [data.categories]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (shouldFetchBooks(data)) {
          const newData = await getBooks(data);
          setData((prevData) => updateNestedState(prevData, "books", newData));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, [data.class]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (shouldFetchChapters(data)) {
          const newData =
            data.answerType == "Textbook Solutions"
              ? await getTextbookChapters(data)
              : await getImportantChapters(data);

          setData((prevData) =>
            updateNestedState(prevData, "chapters", newData)
          );
        }
      } catch (error) {
        console.error("Error fetching data 2:", error);
        setError(error);
      }
    };

    fetchData();
  }, [data.answerType, data.books]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (shouldFetchQuestions(data)) {
          const newData =
            data.answerType == "Textbook Solutions"
              ? await getTextbookQuestions(data)
              : data.answerType == "Important Solutions"
              ? await getImportantQuestions(data)
              : default_;

          setData((prevData) =>
            updateNestedState(prevData, "questions", newData)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, [data.chapters]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        if (shouldFetchAnswers(data)) {
          const answersData = await getAnswers(data);
          setData((prevData) => ({ ...prevData, ...answersData }));
        }
      } catch (error) {
        console.error("Error fetching answers:", error);
        setError(error);
      }
    };

    fetchAnswers();
  }, [data.questions]);

  return (
    <Box sx={{ px: 0 }}>
      <ErrorHandler error={error} set={setError} />
      <QuestionDrawer>
        <Stack spacing={2}>
          <LoadHandler data={data} error={error} />
          <Categories />
          <Class_ />
          <Books />
          <Solution />
          <Chapters />
          <Search />
          <Filter />
          <Questions />
        </Stack>
      </QuestionDrawer>

      <SectionDrawer>
        <Section />
      </SectionDrawer>
      <Box sx={{ width: "100%", height: "100vh", overflow: "auto" }}>
        <QuestionPaper />
      </Box>
    </Box>
  );
}
