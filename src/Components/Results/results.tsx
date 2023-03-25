import { useRecoilState, useRecoilValue } from "recoil";
import { Card } from "react-bootstrap";
import { countryAtom as countryState } from "../../state/atom";

const Results = () => {
  const [countryToSearch, setCountryToSeearch] = useRecoilState(countryState);
  return (
    <Card className="mt-5 w-50 results-card">
      <Card.Body>
        <Card.Title>Results</Card.Title>
        <Card.Text>
          <h6>Capital:{countryToSearch.capital}</h6>
        </Card.Text>
        <Card.Text>
          <h6>Continents:{countryToSearch.continents}</h6>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Results;
