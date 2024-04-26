"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { default_ } from "../app/consts";
import { Section_, data_ } from "../app/types";
import { useSessionStorage } from "@mantine/hooks";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useSessionStorage<data_>({
    key: "fetched-data",
    defaultValue: {
      categories: default_,
      class: default_,
      books: default_,
      questions: default_,
      chapters: default_,
      topics: default_,
      answers: [],
      concepts: [],
      answerType: "",
    },
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): {
  data: data_;
  setData: Dispatch<SetStateAction<data_>>;
} => useContext(DataContext);
// Example data structure for your question paper