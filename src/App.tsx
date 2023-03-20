import "./App.css";
import "./index.css";
import Search from "./Components/Search/search";
import { Container } from "react-bootstrap";
import Rest from "./util/Rest";

export interface SearchCountryProp {
  searchCountry: (country: string) => void;
}
function App() {
  const searchCountry = (country: string) => {
    Rest.getCountry(country);
  };
  return (
    <div className="page-container background-image">
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Search searchCountry={searchCountry} />
      </Container>
    </div>
  );
}

export default App;
