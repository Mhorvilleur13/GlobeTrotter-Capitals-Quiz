import Axios from "axios";

const Rest = {
  async getCountry(nation: string) {
    Axios.get(`https://restcountries.com/v3.1/name/${nation}`).then(
      (response) => {
        console.log(response);
      }
    );
  },
};

export default Rest;
