"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { options_, selected_ } from "../app/types";

const SelectedContext = createContext(null);

export const SelectedProvider = ({ children }) => {
  const [selected, setSelected] = useState<selected_>([]);

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
