import "./index.css";
import { useEffect, useState } from "react";
import Search from "./Components/Search/search";
import Results from "./Components/Results/results";
import GlobeChart from "./Components/Globe/globe";
import { Container } from "react-bootstrap";
import { useRecoilState } from "recoil";
import Rest from "./util/Rest";
import {
  randomCountriesAtom as randomCountriesState,
  countryCounterAtom as countryCounterState,
  allCapitalsAtom as allCapitalsState,
  randomCapitalIndexesAtom as randomCapitalIndexesState,
} from "./state/atom";

export interface ReturnRandomCountriesProp {
  returnRandomCountries: () => void;
}
export interface SkipCountryProp {
  skipCountry: () => void;
}

export interface generateRandomCapitalIndexProp {
  generateRandomCapitalIndex: () => void;
}
function App() {
  const [randomCountries, setRandomCountries] =
    useRecoilState(randomCountriesState);
  const [countryCounter, setCountryCounter] =
    useRecoilState(countryCounterState);
  const [allCapitals, setAllCapitals] = useRecoilState(allCapitalsState);
  const [randomCapitalIndexes, setRandomCapitalIndexes] = useRecoilState(
    randomCapitalIndexesState
  );

  useEffect(() => {
    Rest.getRandomCapitals().then((capitals) => {
      setAllCapitals(capitals);
    });
  }, []);
  const returnRandomCountries = () => {
    Rest.getRandomCountries().then((countries) =>
      setRandomCountries(countries)
    );
    setCountryCounter(0);
  };
  const skipCountry = () => {
    const newCountryCounter = countryCounter + 1;
    setCountryCounter(newCountryCounter);
  };
  const generateRandomCapitalIndex = () => {
    const newRandomIndexes: number[] = [];
    while (newRandomIndexes.length < 3) {
      let randomNumber = Math.floor(Math.random() * 240) + 1;
      if (!newRandomIndexes.includes(randomNumber)) {
        newRandomIndexes.push(randomNumber);
      }
    }
    console.log(newRandomIndexes);
    setRandomCapitalIndexes(newRandomIndexes);
  };
  return (
    <div className="page-container background-image">
      <Container
        className="d-flex align-items-center justify-content-center flex-column"
        style={{ minHeight: "100vh" }}
      >
        <Search
          returnRandomCountries={returnRandomCountries}
          skipCountry={skipCountry}
          generateRandomCapitalIndex={generateRandomCapitalIndex}
        />
        <GlobeChart />
        {/* <Results /> */}
      </Container>
    </div>
  );
}

export default App;
