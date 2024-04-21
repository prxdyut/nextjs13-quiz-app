"use client";
import { Box, Button, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Categories } from "./Categories";
import { Books } from "./Books";
import { Chapters } from "./Chapters";
import { LoadHandler } from "./LoadHandler";
import { TextbookResults } from "./TextbookResults";
import { data_, selected_ } from "./types";
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
import { ImportantResults } from "./ImportantResults";
import { Class_ } from "./Class";
import { ErrorHandler } from "./ErrorHandler";
import { useLocalStorage, useSessionStorage } from "@mantine/hooks";

export default function QuestionsPage() {
  const [error, setError] = useState<false | Error>(false);

  const [data, setData] = useState<data_>({
    categories: default_,
    class: default_,
    books: default_,
    questions: default_,
    chapters: default_,
    topics: default_,
    answers: [],
    concepts: [],
    answerType: "",
  });

  const [selected, setSelected] = useState<selected_>( []);
  console.log(selected)

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
              : await getImportantQuestions(data);

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

  const config = {
    loader: { load: ["input/asciimath", "ui/lazy"] },
  };

  return (
    <MathJaxContext config={config}>
      <Container sx={{ my: 6 }}>
        <ErrorHandler error={error} set={setError} />
        <Stack gap={2}>
          <LoadHandler data={data} error={error} />
          <Categories data={data} set={setData} />
          <Class_ data={data} set={setData} />
          <Books data={data} set={setData} />
          <Solution data={data} set={setData} />
          <Chapters data={data} set={setData} />
          <TextbookResults
            selected={{ data: selected, set: setSelected }}
            data={data}
            set={setData}
          />
          <ImportantResults
            selected={{ data: selected, set: setSelected }}
            data={data}
            set={setData}
          />
        </Stack>
      </Container>
    </MathJaxContext>
  );
}
