import React, { useRef, useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import {
  ReturnRandomCountriesProp,
  SkipCountryProp,
  GenerateRandomCapitalIndexProp,
  AddCorrectAnswerProp,
  StartOverProp,
  CorrectAnswerProp,
} from "../../App";
import {
  randomCountriesAtom as randomCountriesState,
  questionCounterAtom as questionCounterState,
  allCapitalsAtom as allCapitalsState,
  randomCapitalIndexesAtom as randomCapitalIndexesState,
  correctAnswerCounterAtom as correctAnswerCounterState,
  quizStartedAtom as quizStartedState,
} from "../../state/atom";
import "../../index.css";

const Quiz = (
  props: ReturnRandomCountriesProp &
    SkipCountryProp &
    GenerateRandomCapitalIndexProp &
    AddCorrectAnswerProp &
    StartOverProp &
    CorrectAnswerProp
) => {
  const {
    returnRandomCountries,
    skipCountry,
    generateRandomCapitalIndex,
    addCorrectAnswer,
    startOver,
    correctAnswer,
  } = props;

  const [quizStarted, setQuizStarted] = useRecoilState(quizStartedState);
  const [randomCountries, setRandomCountries] =
    useRecoilState(randomCountriesState);
  const [questionCounter, setQuestionCounter] =
    useRecoilState(questionCounterState);
  const [allCapitals, setAllCapitals] = useRecoilState(allCapitalsState);
  const [randomCapitalIndexes, setRandomCapitalIndexes] = useRecoilState(
    randomCapitalIndexesState
  );
  const [shuffledButtons, setShuffledButtons] = useState<JSX.Element[]>([]);
  const [correctAnswerCounter, setCorrectAnswerCounter] = useRecoilState(
    correctAnswerCounterState
  );
  const [isWrongCardShaking, setIsWrongCardShaking] = useState(false);

  const handleSubmit = (_e: React.FormEvent<HTMLFormElement>) => {
    _e.preventDefault();
    returnRandomCountries();
    setQuizStarted(true);
    generateRandomCapitalIndex();
  };

  const buttonElements = [
    <Button
      id="button-choice"
      className="mx-2 btn btn-sm"
      onClick={() => {
        setIsWrongCardShaking(true);

        setTimeout(() => {
          skipCountry();
          generateRandomCapitalIndex();
          setIsWrongCardShaking(false);
        }, 300);
      }}
    >
      {allCapitals[randomCapitalIndexes[0]]}
    </Button>,
    <Button
      id="button-choice"
      className=" mx-2 btn btn-sm"
      onClick={() => {
        setIsWrongCardShaking(true);

        setTimeout(() => {
          skipCountry();
          generateRandomCapitalIndex();
          setIsWrongCardShaking(false);
        }, 300);
      }}
    >
      {allCapitals[randomCapitalIndexes[1]]}
    </Button>,
    <Button
      id="button-choice"
      className="mx-2 btn btn-sm"
      onClick={() => {
        addCorrectAnswer();
        correctAnswer();
        skipCountry();
        generateRandomCapitalIndex();
      }}
    >
      {randomCountries[questionCounter]?.capital}
    </Button>,
    <Button
      id="button-choice"
      className="mx-2 btn btn-sm"
      onClick={() => {
        setIsWrongCardShaking(true);

        setTimeout(() => {
          skipCountry();
          generateRandomCapitalIndex();
          setIsWrongCardShaking(false);
        }, 300);
      }}
    >
      {allCapitals[randomCapitalIndexes[2]]}
    </Button>,
  ];

  useEffect(() => {
    const newShuffledButtons = buttonElements.sort(
      (a, b) => 0.5 - Math.random()
    );

    // Add keys to each button element
    const buttonsWithKeys = newShuffledButtons.map((button, index) => (
      <React.Fragment key={index}>{button}</React.Fragment>
    ));
    setShuffledButtons(buttonsWithKeys);
  }, [questionCounter, randomCountries]);

  return (
    <div>
      <Card
        className={`search-card mt-3 text-center ${
          isWrongCardShaking ? "wrong-shake" : ""
        }`}
      >
        {!quizStarted && (
          <Card.Body>
            <h4>Capitals Quiz</h4>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Button className="w-75" id="button-choice" type="submit">
                Start
              </Button>
            </Form>
          </Card.Body>
        )}
        {quizStarted && questionCounter < 15 && (
          <Card.Body>
            <Card.Text className="text-center question-count">
              {questionCounter + 1} out of 15
            </Card.Text>
            <Card.Text className="mt-2 text-center country-container">
              {randomCountries[questionCounter]?.flag}
              {randomCountries[questionCounter]?.country}
              {randomCountries[questionCounter]?.flag}
            </Card.Text>
            <div className="buttons-div">{shuffledButtons}</div>
            <Card.Text className="text-center score mt-1">
              Score:{correctAnswerCounter} / {randomCountries.length}
            </Card.Text>
          </Card.Body>
        )}
        {questionCounter >= 15 && (
          <Card.Body>
            <Card.Title className="text-center">Results</Card.Title>
            <Card.Text className="text-center score">
              {correctAnswerCounter} / 15
            </Card.Text>
            <Button id="button-choice" onClick={startOver}>
              Play Again!
            </Button>
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default Quiz;
