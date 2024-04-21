"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { default_ } from "../app/consts";
import { data_ } from "../app/types";

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
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
