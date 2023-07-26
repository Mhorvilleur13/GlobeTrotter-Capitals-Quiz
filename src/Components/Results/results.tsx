import { useRecoilState, useRecoilValue } from "recoil";
import { Card } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { randomCountriesAtom as randomCountriesState } from "../../state/atom";
import check from "../../Assets/images/checked (2).png";
import cancel from "../../Assets/images/cancel.png";

const Results = () => {
  const [randomCountries, setRandomCountries] =
    useRecoilState(randomCountriesState);
  return (
    <Table
      striped
      bordered
      hover
      variant="dark"
      className=" mt-2 w-75 results-table"
    >
      <thead>
        <tr>
          <th>Country</th>
          <th>Capital</th>
        </tr>
      </thead>
      <tbody>
        {randomCountries.length >= 1 &&
          randomCountries.map((country) => {
            return (
              <tr>
                <td>
                  {country.country}
                  {country.flag}
                </td>
                <td>
                  {country.capital}
                  {country.wasClicked ? (
                    <img
                      height="20px"
                      width="20px"
                      src={check}
                      style={{ marginLeft: "10px" }}
                    />
                  ) : (
                    <img
                      height="25px"
                      width="25px"
                      src={cancel}
                      style={{ marginLeft: "10px" }}
                    />
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default Results;
