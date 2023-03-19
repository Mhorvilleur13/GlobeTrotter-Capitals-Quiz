import "./App.css";
import "./index.css";
import Search from "./Components/Search/search";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="page-container background-image">
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Search />
      </Container>
    </div>
  );
}

export default App;
