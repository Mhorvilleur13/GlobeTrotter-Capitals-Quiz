import React, { useRef, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { ReturnRandomCountriesProp, SkipCountryProp } from "../../App";
import {
  randomCountriesAtom as randomCountriesState,
  countryCounterAtom as countryCounterState,
} from "../../state/atom";

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
              <b>Country:</b>
              {randomCountries[countryCounter]?.country}{" "}
            </Card.Text>
            <div className="d-flex ">
              <Button className="mx-2">Capital1</Button>
              <Button>Capital2</Button>
              <Button className="mx-2">Capital3</Button>
              <Button>Capital4</Button>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <Button onClick={skipCountry} variant="danger" size="sm">
                Skip
              </Button>
            </div>
          </Card.Body>
        )}
      </Card>
    </div>
  );
};

export default Search;
