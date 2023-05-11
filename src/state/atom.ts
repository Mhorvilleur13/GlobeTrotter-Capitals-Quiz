import { Country, Capital, RandomIndex } from "../types/country";
import { atom } from "recoil";

export const randomCountriesAtom = atom<Country[]>({
  key: "random-countries-Atom",
  default: [],
});

export const questionCounterAtom = atom<number>({
  key: "country-counter-atom",
  default: 0,
});

export const allCapitalsAtom = atom<Capital[][]>({
  key: "all-captials-atom",
  default: [],
});

export const randomCapitalIndexesAtom = atom<RandomIndex[]>({
  key: "random-indexes",
  default: [],
});

export const correctAnswerCounterAtom = atom<number>({
  key: "correct-answer-counter",
  default: 0,
});

export const quizStartedAtom = atom<boolean>({
  key: "quiz-started",
  default: false,
});
