"use client";
import { Box, Stack, Typography } from "@mui/material";
import { MathJax } from "better-react-mathjax";
import React from "react";
import ReactDOM from "react-dom";

// Example data structure for your question paper
const exampleQuestionPaper = [
  {
    id: "Q1",
    title: "answer the following",
    sections: [
      {
        id: "A",
        title: "Fill in the blanks",
        questions: [
          {
            id: "i",
            text: `<div class="qp_result_data_data_meta">Exercises • Q 1.1 • Page 16</div><div class="html_wrap"><div class="html_text"><p><strong>Multiple choice question.</strong></p>
          <p>Insect pollinated flowers usually posses ______</p></div><ul class="qbq_items"><li class="html_text"><p>Sticky pollens with rough surface</p></li><li class="html_text"><p>Large quantities of pollens</p></li><li class="html_text"><p>Dry pollens with smooth surface</p></li><li class="html_text"><p>Light coloured pollens</p></li></ul></div><div class="clearfix2"><a class="button_link view_solution" href="/question-bank-solutions/multiple-choice-question-insect-pollinated-flowers-usually-posses-______-reproduction-in-plant_159933#ref=chapter&amp;id=132743">VIEW SOLUTION</a></div>`,
          },
          {
            id: "ii",
            text: `<div class="qp_result_data_data_meta">Exercises • Q 1.6 • Page 16</div><div class="html_wrap"><div class="html_text"><p><strong>Multiple choice question.</strong></p>
          <p>In angiosperms, endosperm is formed by/ due to ______</p></div><ul class="qbq_items"><li class="html_text"><p>free nuclear divisions of megaspore</p></li><li class="html_text"><p>polar nuclei</p></li><li class="html_text"><p>polar nuclei and male gamete</p></li><li class="html_text"><p>synergids and male gamete</p></li></ul></div><div class="clearfix2"><a class="button_link view_solution" href="/question-bank-solutions/multiple-choice-question-in-angiosperms-endosperm-is-formed-by-due-to-______-reproduction-in-plant_159955#ref=chapter&amp;id=132761">VIEW SOLUTION</a></div>`,
          },
        ],
      },
      {
        id: "B",
        title: "Answer in one word",
        questions: [
          {
            id: "a",
            text: `<div class="qp_result_data_data_meta">Brainstorming (A2) • Q 1 • Page 8</div><div class="html_wrap"><div class="html_text"><p>The tactics used by the astrologer to earn his wages are...</p>
          <p><img src="https://www.shaalaa.com/images/_4:67b1ece303134b26b10bc59bb3992c21.png"></p></div></div><div class="clearfix2"><a class="button_link view_solution" href="/question-bank-solutions/the-tactics-used-by-the-astrologer-to-earn-his-wages-are-an-astrologer-s-day_143175#ref=chapter&amp;id=118287">VIEW SOLUTION</a></div>`,
          },
          {
            id: "b",
            text: `<div class="qp_result_data_data_meta">Ice Breakers • Q 1 • Page 1</div><div class="html_wrap"><div class="html_text"><p>Discuss with your partner and complete the activity. What are your strengths?</p>
            <table style="width: 99.4962%;" border="1">
            <tbody>
            <tr>
            <td style="width: 21.3212%; text-align: center;"><strong>Strengths</strong></td>
            <td style="width: 21.3212%; text-align: center;"><strong>Why do you feel so?</strong></td>
            <td style="width: 21.5744%; text-align: center;"><strong>Dream Career</strong></td>
            </tr>
            <tr>
            <td style="width: 21.3212%; text-align: left;">painting and drawing</td>
            <td style="width: 21.3212%; text-align: left;">can visualise, express</td>
            <td style="width: 21.5744%; text-align: left;">commercial artist, cartoonist</td>
            </tr>
            <tr>
            <td style="width: 21.3212%;">&nbsp;</td>
            <td style="width: 21.3212%;">&nbsp;</td>
            <td style="width: 21.5744%;">&nbsp;</td>
            </tr>
            <tr>
            <td style="width: 21.3212%;">&nbsp;</td>
            <td style="width: 21.3212%;">&nbsp;</td>
            <td style="width: 21.5744%;">&nbsp;</td>
            </tr>
            <tr>
            <td style="width: 21.3212%;">&nbsp;</td>
            <td style="width: 21.3212%;">&nbsp;</td>
            <td style="width: 21.5744%;">&nbsp;</td>
            </tr>
            </tbody>
            </table></div></div><div class="clearfix2"><a class="button_link view_solution" href="/question-bank-solutions/discuss-with-your-partner-and-complete-the-activitywhat-are-your-strengths-an-astrologer-s-day_143165#ref=chapter&amp;id=118277">VIEW SOLUTION</a></div>`,
          },
          {
            id: "c",
            text: `<div class="qp_result_data_data_meta">Exercise 1.1 • Q 1.6 • Page 11</div><div class="html_wrap"><div class="html_text"><p><strong>Differentiate the following w.r.t.x:</strong></p>
          <p>\`(sqrt(3x - 5) - 1/sqrt(3x - 5))^5\`</p></div></div><div class="clearfix2"><a class="button_link view_solution" href="/question-bank-solutions/differentiate-the-following-wrtx-3x-5-13x-5-5-differentiation_144857#ref=chapter&amp;id=119952">VIEW SOLUTION</a></div>`,
          },
        ],
      },
    ],
  },
  {
    id: "Q2",
    title: "answer in any medium",
    questions: [
      {
        id: "i",
        text: `<div class="qp_result_data_data_meta">Exercises • Q 2.06 • Page 26</div><div class="html_wrap"><div class="html_text"><p><strong>Answer the following in one or two sentences.</strong></p>
      <p>The picture represents bands of MOs for Si. Label valence band, conduction band, and band gap.</p>
      <p><img src="https://www.shaalaa.com/images/_4:864835f82af641d3a2e2990a186cfd59.png"></p></div></div><div class="clearfix2"><a class="button_link view_solution" href="/question-bank-solutions/answer-the-following-in-one-or-two-sentences-the-picture-represents-bands-of-mos-for-si-label-valence-band-conduction-band-and-band-gap-electrical-properties-of-solids_156739#ref=chapter&amp;id=129555">VIEW SOLUTION</a></div>`,
      },
      {
        id: "ii",
        text: `<div class="qp_result_data_data_meta">Exercises • Q 13 • Page 27</div><div class="html_wrap"><div class="html_text"><p>Explain with diagram, Frenkel defect. What are the conditions for its formation? What is its effect on density and electrical neutrality of the crystal?</p></div></div><div class="clearfix2"><a class="button_link view_solution" href="/question-bank-solutions/explain-with-diagram-frenkel-defect-what-are-the-conditions-for-its-formation-what-is-its-effect-on-density-and-electrical-neutrality-of-the-crystal-electrical-properties-of-solids_156785#ref=chapter&amp;id=129595">VIEW SOLUTION</a></div>`,
      },
    ],
  },
];

const processQuestion = (html: string) => {
  return html
    .replaceAll("Multiple choice question.", "")
    .replaceAll("Answer the following in one or two sentences.", "");
};

// Component to render a single question
const QuestionComponent = ({ question }) => {
  return (
    <Box sx={{ pb: 1 }}>
      <MathJax inline dynamic>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          {question.id}.
          <div
            style={{ display: "inline" }}
            dangerouslySetInnerHTML={{ __html: processQuestion(question.text) }}
          />
        </Box>
      </MathJax>
      {question.options && (
        <ul>
          {question.options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      )}
    </Box>
  );
};

const SectionComponent = ({ section }) => {
  return (
    <Box>
      <Typography className="section-title">
        {section.id}. {section.title}
      </Typography>
      <Stack spacing={2} sx={{ pl: 4, pt: 1, pb: 3 }}>
        {section.questions &&
          section.questions.map((question) => (
            <QuestionComponent key={question.id} question={question} />
          ))}
      </Stack>
    </Box>
  );
};

// Component to render the main question or paper
const MainQuestionComponent = ({ mainQuestion }) => {
  return (
    <Box>
      <Typography className="main-question-title">
        {mainQuestion.id}. {mainQuestion.title}
      </Typography>
      <Stack sx={{ pl: 4, pt: 1, pb: 3 }} spacing={2}>
        {mainQuestion.sections &&
          mainQuestion.sections.map((section) => (
            <SectionComponent key={section.id} section={section} />
          ))}
        {mainQuestion.questions &&
          mainQuestion.questions.map((question) => (
            <QuestionComponent key={question.id} question={question} />
          ))}
      </Stack>
    </Box>
  );
};

// Component to render the example question paper
const ExampleQuestionPaper = ({ questionPaper }) => {
  return (
    <Box>
      <Stack sx={{ pl: 2 }} spacing={2}>
        {questionPaper.map((mainQuestion) => (
          <MainQuestionComponent
            key={mainQuestion.id}
            mainQuestion={mainQuestion}
          />
        ))}
      </Stack>
    </Box>
  );
};

const App = () => {
  return (
    <Box className="question-paper">
      <ExampleQuestionPaper questionPaper={exampleQuestionPaper} />;
    </Box>
  );
};

export default App;
