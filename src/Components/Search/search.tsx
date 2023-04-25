import React, { useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { ReturnRandomCountriesProp, SkipCountryProp } from "../../App";
import {
  randomCountriesAtom as randomCountriesState,
  countryCounterAtom as countryCounterState,
} from "../../state/atom";
import "../../index.css";

const Search = (props: ReturnRandomCountriesProp & SkipCountryProp) => {
  const { returnRandomCountries, skipCountry } = props;
  const quizRef = useRef(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [randomCountries, setRandomCountries] =
    useRecoilState(randomCountriesState);
  const [countryCounter, setCountryCounter] =
    useRecoilState(countryCounterState);

  const handleSubmit = (_e: any) => {
    _e.preventDefault();
    returnRandomCountries();
    setQuizStarted(true);
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
            <div className="d-flex ">
              <Button className="mx-2 choice-button">Capital1</Button>
              <Button className="choice-button">Capital2</Button>
              <Button className="mx-2 choice-button">Capital3</Button>
              <Button className="choice-button">Capital4</Button>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <Button onClick={skipCountry} size="sm">
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
