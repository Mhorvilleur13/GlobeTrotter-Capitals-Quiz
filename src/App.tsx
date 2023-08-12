import "./index.css";
import { useEffect, useState } from "react";
import Quiz from "./Components/Quiz/quiz";
import Results from "./Components/Results/results";

import Globe from "./Components/Globe/globe";
import { Container } from "react-bootstrap";
import { useRecoilState } from "recoil";
import Rest from "./util/Rest";
import {
  randomCountriesAtom as randomCountriesState,
  questionCounterAtom as questionCounterState,
  allCapitalsAtom as allCapitalsState,
  randomCapitalIndexesAtom as randomCapitalIndexesState,
  correctAnswerCounterAtom as correctAnswerCounterState,
  quizStartedAtom as quizStartedState,
} from "./state/atom";

export interface ReturnRandomCountriesProp {
  returnRandomCountries: () => void;
}
export interface SkipCountryProp {
  skipCountry: () => void;
}

export interface GenerateRandomCapitalIndexProp {
  generateRandomCapitalIndex: () => void;
}

export interface AddCorrectAnswerProp {
  addCorrectAnswer: () => void;
}
export interface StartOverProp {
  startOver: () => void;
}
export interface CorrectAnswerProp {
  correctAnswer: () => void;
}
function App() {
  const [randomCountries, setRandomCountries] =
    useRecoilState(randomCountriesState);
  const [questionCounter, setQuestionCounter] =
    useRecoilState(questionCounterState);
  const [allCapitals, setAllCapitals] = useRecoilState(allCapitalsState);
  const [randomCapitalIndexes, setRandomCapitalIndexes] = useRecoilState(
    randomCapitalIndexesState
  );
  const [correctAnswerCounter, setCorrectAnswerCounter] = useRecoilState(
    correctAnswerCounterState
  );

  const [quizStarted, setQuizStarted] = useRecoilState(quizStartedState);

  useEffect(() => {
    Rest.getRandomCapitals().then((capitals) => {
      setAllCapitals(capitals);
    });
  }, []);

  const returnRandomCountries = () => {
    Rest.getRandomCountries().then((countries) =>
      setRandomCountries(countries)
    );
    setQuestionCounter(0);
    setCorrectAnswerCounter(0);
  };

  const addCorrectAnswer = () => {
    const newCorrectAnswerCounter = correctAnswerCounter + 1;
    setCorrectAnswerCounter(newCorrectAnswerCounter);
  };

  const correctAnswer = () => {
    const updatedRandomCountries = [...randomCountries];
    const updatedCountry = { ...updatedRandomCountries[questionCounter] };
    updatedCountry.wasClicked = true;
    updatedRandomCountries[questionCounter] = updatedCountry;
    setRandomCountries(updatedRandomCountries);
  };

  const skipCountry = () => {
    const newCountryCounter = questionCounter + 1;
    setQuestionCounter(newCountryCounter);
  };

  const generateRandomCapitalIndex = () => {
    const newRandomIndexes: number[] = [];
    while (newRandomIndexes.length < 3) {
      let randomNumber = Math.floor(Math.random() * 240) + 1;
      if (!newRandomIndexes.includes(randomNumber)) {
        newRandomIndexes.push(randomNumber);
      }
    }
    setRandomCapitalIndexes(newRandomIndexes);
  };

  const startOver = () => {
    setQuestionCounter(0);
    setCorrectAnswerCounter(0);
    returnRandomCountries();
    setQuizStarted(false);
  };

  return (
    <div className="background-image">
      <Container
        className="d-flex align-items-center justify-content-center flex-column text-center"
        style={{ minHeight: "100vh" }}
      >
        <Quiz
          returnRandomCountries={returnRandomCountries}
          skipCountry={skipCountry}
          generateRandomCapitalIndex={generateRandomCapitalIndex}
          addCorrectAnswer={addCorrectAnswer}
          startOver={startOver}
          correctAnswer={correctAnswer}
        />

        {questionCounter < 15 ? <Globe /> : <Results />}
      </Container>
    </div>
  );
}

export default App;
