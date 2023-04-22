import "./index.css";
import { useEffect } from "react";
import Search from "./Components/Search/search";
import Results from "./Components/Results/results";
import GlobeChart from "./Components/Globe/globe";
import { Container } from "react-bootstrap";
import { useRecoilState } from "recoil";
import Rest from "./util/Rest";
import {
  randomCountriesAtom as randomCountriesState,
  countryCounterAtom as countryCounterState,
} from "./state/atom";

export interface ReturnRandomCountriesProp {
  returnRandomCountries: () => void;
}
export interface SkipCountryProp {
  skipCountry: () => void;
}
function App() {
  const [randomCountries, setRandomCountries] =
    useRecoilState(randomCountriesState);
  const [countryCounter, setCountryCounter] =
    useRecoilState(countryCounterState);

  const returnRandomCountries = () => {
    Rest.getRandomCountries().then((countries) =>
      setRandomCountries(countries)
    );
    setCountryCounter(0);
  };
  const skipCountry = () => {
    const newCountryCounter = countryCounter + 1;
    console.log(newCountryCounter);
    setCountryCounter(newCountryCounter);
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
        />
        <GlobeChart />
        {/* <Results /> */}
      </Container>
    </div>
  );
}

export default App;
