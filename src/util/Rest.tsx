import Axios from "axios";
import { Country, Capital } from "../types/country";

const Rest = {
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
      while (randomIndexes.length < 15) {
        const randomIndex = Math.floor(Math.random() * countries.length);
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }
      // this returns array of 10 countries with all data
      // const randomCountriesFull = randomIndexes.map((index) => {
      //   if (
      //     countries[index].capital !== undefined &&
      //     countries[index].capital.length === 1
      //   ) {
      //     return countries[index];
      //   }
      // });

      const randomCountriesFull = randomIndexes.map(
        (index) => countries[index]
      );

      console.log(randomCountriesFull);
      // returns 10 countries with capital, lat, long, and flag.
      const randomCountries = randomCountriesFull.map((country) => {
        const capital = country.capital ? country.capital : "No Capital";
        return {
          country: country.name.common,
          capital: capital,
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
