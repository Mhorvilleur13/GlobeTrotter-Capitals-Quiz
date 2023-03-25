import { Country } from "../types/country";
import { atom } from "recoil";

export const countryAtom = atom<Country>({
  key: "country-Atom",
  default: { capital: [], continents: [] },
});
