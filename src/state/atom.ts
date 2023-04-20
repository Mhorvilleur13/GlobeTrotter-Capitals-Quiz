import { Country } from "../types/country";
import { atom } from "recoil";

export const randomCountriesAtom = atom<Country[]>({
  key: "random-countries-Atom",
  default: [],
});

export const countryCounterAtom = atom<number>({
  key: "country-counter-atom",
  default: 0,
});
