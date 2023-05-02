import { Country, Capital, RandomIndex } from "../types/country";
import { atom } from "recoil";

export const randomCountriesAtom = atom<Country[]>({
  key: "random-countries-Atom",
  default: [],
});

export const countryCounterAtom = atom<number>({
  key: "country-counter-atom",
  default: 0,
});

export const allCapitalsAtom = atom<Capital[][]>({
  key: "all-captials-atom",
  default: [],
});

export const randomIndexesAtom = atom<RandomIndex[]>({
  key: "random-indexes",
  default: [],
});
