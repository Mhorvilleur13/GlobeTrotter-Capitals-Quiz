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

      const randomCountriesFull = randomIndexes.map(
        (index) => countries[index]
      );

      console.log(randomCountriesFull);

      const randomCountries = randomCountriesFull.map((country) => {
        const capital = country.capital ? country.capital : "No Capital";
        return {
          country: country.name.common,
          capital: capital[0],
          latlng: country.latlng,
          flag: country.flag,
          area: country.area,
          wasClicked: false,
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
