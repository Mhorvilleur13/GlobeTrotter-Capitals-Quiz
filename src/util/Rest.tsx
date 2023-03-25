import Axios from "axios";
import { Country } from "../types/country";

const Rest = {
  async getCountry(nation: string): Promise<Country> {
    try {
      const response = await Axios.get(
        `https://restcountries.com/v3.1/name/${nation}`
      );
      const countryObject: Country = {
        capital: response.data[0].capital,
        continents: response.data[0].continents,
      };
      console.log(countryObject);
      return countryObject;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default Rest;

// return Axios.get(`https://restcountries.com/v3.1/name/${nation}`).then(
//   (response) => {
//     const countryObject: Country = {
//       capital: response.data[0].capital,
//       continents: response.data[0].continents,
//     };
//     console.log(countryObject);
//     return countryObject;
//   }
// );
