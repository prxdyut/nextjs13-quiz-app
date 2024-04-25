"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { options_, selected_ } from "../app/types";
import { useLocalStorage, useSessionStorage } from "@mantine/hooks";

const SelectedContext = createContext(null);

export const SelectedProvider = ({ children }) => {
  const [selected, setSelected] = useSessionStorage<selected_>({
    key: "s",
    defaultValue: {
      section: { id: "", title: "", marks: '', location: [], edit: false },
      questions: [],
      question: { html: "", location: [], edit: false },
    },
  });
  
  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = (): {
  selected: selected_;
  setSelected: Dispatch<SetStateAction<selected_>>;
} => useContext(SelectedContext);
