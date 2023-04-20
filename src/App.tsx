import "./index.css";
import { useEffect } from "react";
import Search from "./Components/Search/search";
import Results from "./Components/Results/results";
import GlobeChart from "./Components/Globe/globe";
import { Container } from "react-bootstrap";
import { useRecoilState } from "recoil";
import Rest from "./util/Rest";
import { randomCountriesAtom as randomCountriesState } from "./state/atom";
import { Countries } from "../src/types/country";

export interface ReturnRandomCountriesProp {
  returnRandomCountries: () => void;
}
function App() {
  const [randomCountries, setRandomCountries] =
    useRecoilState(randomCountriesState);

  const returnRandomCountries = () => {
    Rest.getRandomCountries().then((countries) =>
      setRandomCountries(countries)
    );
  };
  return (
    <div className="page-container background-image">
      <Container
        className="d-flex align-items-center justify-content-center flex-column"
        style={{ minHeight: "100vh" }}
      >
        <Search returnRandomCountries={returnRandomCountries} />
        <GlobeChart />
        {/* <Results /> */}
      </Container>
    </div>
  );
}

export default App;
