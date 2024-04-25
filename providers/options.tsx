"use client";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { options_ } from "../app/types";

const OptionsContext = createContext(null);

export const OptionsProvider = ({ children }) => {
  const [options, setOptions] = useState<options_>({
    filter: "",
    search: "",
    showAnswers: false,
    questionDrawer: false,
    sectionDrawer: false,
  });

  const getSome = async () => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return "abc";
  };

  return (
    <OptionsContext.Provider value={{ options, setOptions, getSome }}>
      {children}
    </OptionsContext.Provider>
  );
};

export const useOptions = (): {
  options: options_;
  setOptions: Dispatch<SetStateAction<options_>>;
} => useContext(OptionsContext);
