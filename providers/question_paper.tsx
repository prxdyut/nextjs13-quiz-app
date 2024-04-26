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

const QuestionPaperContext = createContext(null);
export const QuestionPaperProvider = ({ children }) => {
  const [questionPaper, setQuestionPaper] = useState<Section_[]>(
    [
      {
        id: "Q1",
        title: "Chapter 1: Reproduction in Plants",
        questions: [],
        marks: '100',
        sections: [
          {
            id: "sec1",
            title: "Multiple Choice Questions",
            questions: [
              {
                text: "<div class='question'><p>Insect pollinated flowers usually possess:</p><ul><li>Sticky pollens with rough surface</li><li>Large quantities of pollens</li><li>Dry pollens with smooth surface</li><li>Light coloured pollens</li></ul></div>",
              },
              {
                text: "<div class='question'><p>The ploidy level is not the same in:</p><ul><li>Integuments and nucellus</li><li>Root tip and shoot tip</li><li>Secondary nucleus and endosperm</li><li>Antipodals and synergids</li></ul></div>",
              },
              {
                text: "<div class='question'><p>Point out the odd one:</p><ul><li>Nucellus</li><li>Embryo sac</li><li>Micropyle</li><li>Pollen grain</li></ul></div>",
              },
            ],
            sections: [],
            marks: '20'
          },
          {
            id: "sec2",
            title: "Short Answer Questions",
            questions: [
              {
                text: "<div class='question'><p>What is hydrophily?</p></div>",
              },
            ],
            sections: [],
            marks: '10'
          },
          
        ],
      },
      {
        id: "Q2",
        title: "Chapter 2: Genetics and Evolution",
        questions: [],
        marks: '50',
        sections: [
          {
            id: "sec3",
            title: "Multiple Choice Questions",
            questions: [
              {
                text: "<div class='question'><p>Which of the following is not a source of genetic variation?</p><ul><li>Mutation</li><li>Recombination</li><li>Gene flow</li><li>Mitosis</li></ul></div>",
              },
            ],
            sections: [],
            marks: '5'
          },
        ],
      },
    ]
  );
  console.log(questionPaper);
  return (
    <QuestionPaperContext.Provider value={{ questionPaper, setQuestionPaper }}>
      {children}
    </QuestionPaperContext.Provider>
  );
};

export const useQuestionPaper = (): {
  questionPaper: Section_[];
  setQuestionPaper: Dispatch<SetStateAction<Section_[]>>;
} => useContext(QuestionPaperContext);
