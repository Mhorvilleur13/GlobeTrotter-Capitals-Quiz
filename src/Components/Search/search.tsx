import React, { useRef, useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import {
  ReturnRandomCountriesProp,
  SkipCountryProp,
  generateRandomCapitalIndexProp,
} from "../../App";
import {
  randomCountriesAtom as randomCountriesState,
  countryCounterAtom as countryCounterState,
  allCapitalsAtom as allCapitalsState,
  randomCapitalIndexesAtom as randomCapitalIndexesState,
} from "../../state/atom";
import "../../index.css";

const Search = (
  props: ReturnRandomCountriesProp &
    SkipCountryProp &
    generateRandomCapitalIndexProp
) => {
  const { returnRandomCountries, skipCountry, generateRandomCapitalIndex } =
    props;
  const quizRef = useRef(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [randomCountries, setRandomCountries] =
    useRecoilState(randomCountriesState);
  const [countryCounter, setCountryCounter] =
    useRecoilState(countryCounterState);
  const [allCapitals, setAllCapitals] = useRecoilState(allCapitalsState);
  const [randomCapitalIndexes, setRandomCapitalIndexes] = useRecoilState(
    randomCapitalIndexesState
  );
  const [shuffledButtons, setShuffledButtons] = useState<JSX.Element[]>([]);

  const handleSubmit = (_e: any) => {
    _e.preventDefault();
    returnRandomCountries();
    setQuizStarted(true);
    generateRandomCapitalIndex();
  };

  const buttonElements = [
    <Button className="button-choice mx-2">
      {allCapitals[randomCapitalIndexes[0]]}
    </Button>,
    <Button className="button-choice mx-2">
      {allCapitals[randomCapitalIndexes[1]]}
    </Button>,
    <Button className="button-choice mx-2">
      {randomCountries[countryCounter]?.capital}
    </Button>,
    <Button className="button-choice mx-2">
      {allCapitals[randomCapitalIndexes[2]]}
    </Button>,
  ];

  useEffect(() => {
    const newShuffledButtons = buttonElements.sort(
      (a, b) => 0.5 - Math.random()
    );
    setShuffledButtons(newShuffledButtons);
  }, [countryCounter, randomCountries]);

  return (
    <div>
      <Card className="search-card">
        {!quizStarted && (
          <Card.Body>
            <h2 className="text-center">Start Quiz!</h2>
            <Form onSubmit={handleSubmit}>
              <Button className="w-100 mt-2" type="submit">
                GO
              </Button>
            </Form>
          </Card.Body>
        )}
        {quizStarted && (
          <Card.Body>
            <Card.Text className="mt-2 text-center">
              {randomCountries[countryCounter]?.flag}
              {randomCountries[countryCounter]?.country}
              {randomCountries[countryCounter]?.flag}
            </Card.Text>
            <div className="d-flex">{shuffledButtons}</div>
            <div className="d-flex justify-content-center mt-2">
              <Button
                onClick={() => {
                  skipCountry();
                  generateRandomCapitalIndex();
                }}
                size="sm"
              >
                Next
              </Button>
            </div>
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default Search;
