import Axios from "axios";
import { Country, Capital } from "../types/country";

const Rest = {
  // async getCountry(nation: string): Promise<Country> {
  //   try {
  //     const response = await Axios.get(
  //       `https://restcountries.com/v3.1/name/${nation}`
  //     );
  //     const countryObject: Country = {
  //       capital: response.data[0].capital,
  //       continents: response.data[0].continents,
  //     };
  //     console.log(countryObject);
  //     return countryObject;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // },
  async getRandomCapitals(): Promise<Capital[][]> {
    try {
      const response = await Axios.get("https://restcountries.com/v3.1/all");
      const countries = response.data;
      const allCapitals: Capital[][] = [];
      countries.forEach((country: { capital: Capital[] }) => {
        if (country.capital !== undefined && country.capital.length === 1) {
          allCapitals.push(country.capital);
        }
      });
      console.log(allCapitals);
      return allCapitals;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  async getRandomCountries(): Promise<Country[]> {
    try {
      const response = await Axios.get("https://restcountries.com/v3.1/all");
      const randomIndexes: number[] = [];
      const countries = response.data;
      while (randomIndexes.length < 10) {
        const randomIndex = Math.floor(Math.random() * countries.length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }
      // const randomCountriesFull = randomIndexes.map(
      //   (index) => countries[index]
      // );
      const randomCountriesFull = randomIndexes.map(
        (index) => countries[index].capital !== undefined && countries[index]
      );

      console.log(randomCountriesFull);
      const randomCountries = randomCountriesFull.map((country) => {
        return {
          country: country.name.common,
          capital: country.capital,
          latlng: country.latlng,
          flag: country.flag,
        };
      });
      console.log(randomCountries);
      return randomCountries;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default Rest;
