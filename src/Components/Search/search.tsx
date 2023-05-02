import React, { useRef, useState } from "react";
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
  randomIndexesAtom as randomIndexesState,
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
  const [randomIndexes, setRandomIndexes] = useRecoilState(randomIndexesState);

  const handleSubmit = (_e: any) => {
    _e.preventDefault();
    returnRandomCountries();
    setQuizStarted(true);
    generateRandomCapitalIndex();
  };
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
            <div className="d-flex">
              <Button className="button-choice mx-2">
                {allCapitals[randomIndexes[0]]}
              </Button>
              <Button className="button-choice">
                {allCapitals[randomIndexes[1]]}
              </Button>
              <Button className="button-choice mx-2">
                {randomCountries[countryCounter]?.capital}
              </Button>
              <Button className="button-choice">
                {allCapitals[randomIndexes[2]]}
              </Button>
            </div>
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
