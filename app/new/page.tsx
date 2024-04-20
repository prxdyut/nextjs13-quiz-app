"use client";
import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MathJaxContext } from "better-react-mathjax";
import { Categories } from "./Categories";
import { Books } from "./Books";
import { Chapters } from "./Chapters";
import { LoadHandler } from "./LoadHandler";
import { Results } from "./Results";
import { data_ } from "./types";
import {
  getBookCategory,
  getBooks,
  getChapters,
  getQuestions,
  getAnswers,
} from "./utils";
import { default_ } from "./consts";
import {
  updateNestedState,
  shouldFetchCategories,
  shouldFetchBooks,
  shouldFetchChapters,
  shouldFetchQuestions,
  shouldFetchAnswers,
} from "./helpers";

export default function Page() {
  const [data, setData] = useState<data_>({
    categories: default_,
    books: default_,
    questions: default_,
    chapters: default_,
    answers: [],
    concepts: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const { categories, books, chapters, questions } = data;

      try {
        if (shouldFetchCategories(categories)) {
          const newData = await getBookCategory(data);
          setData((prevData) =>
            updateNestedState(prevData, "categories", newData)
          );
        }

        if (shouldFetchBooks(categories, books)) {
          const newData = await getBooks(data);
          setData((prevData) => updateNestedState(prevData, "books", newData));
        }

        if (shouldFetchChapters(categories, books, chapters)) {
          const newData = await getChapters(data);
          setData((prevData) =>
            updateNestedState(prevData, "chapters", newData)
          );
        }

        if (shouldFetchQuestions(categories, books, chapters, questions)) {
          const newData = await getQuestions(data);
          setData((prevData) =>
            updateNestedState(prevData, "questions", newData)
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(error);
      }
    };

    fetchData();
  }, [data]);
  useEffect(() => {
    const fetchAnswers = async () => {
      const { categories, books, chapters, questions } = data;

      try {
        if (shouldFetchAnswers(categories, books, chapters, questions)) {
          const answersData = await getAnswers(data);
          setData((prevData) => ({ ...prevData, ...answersData }));
        }
      } catch (error) {
        console.error("Error fetching answers:", error);
        // Handle errors here (e.g., show a notification, set an error state, etc.)
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
        <Stack gap={2}>
          <LoadHandler data={data} />
          <Categories data={data} set={setData} />
          <Books data={data} set={setData} />
          <Chapters data={data} set={setData} />
          <Results data={data} set={() => {}} />
        </Stack>
      </Container>
    </MathJaxContext>
  );
}
