import "./index.css";
import Search from "./Components/Search/search";
import Results from "./Components/Results/results";
import { Container } from "react-bootstrap";
import { useRecoilState } from "recoil";
import Rest from "./util/Rest";
import { countryAtom as countryState } from "./state/atom";
import { Country } from "../src/types/country";

export interface SearchCountryProp {
  searchCountry: (country: string) => void;
}
function App() {
  const [countryToSearch, setCountryToSearch] = useRecoilState(countryState);
  const searchCountry = (country: string) => {
    Rest.getCountry(country).then((returnedCountry) => {
      setCountryToSearch(returnedCountry);
    });
  };
  return (
    <div className="page-container background-image">
      <Container
        className="d-flex align-items-center justify-content-center flex-column"
        style={{ minHeight: "80vh" }}
      >
        <Search searchCountry={searchCountry} />
        <Results />
      </Container>
    </div>
  );
}

export default App;
