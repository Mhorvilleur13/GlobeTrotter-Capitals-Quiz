import { number } from "@amcharts/amcharts4/core";

export interface Countries {
  [x: string]: any;
  [index: number]: { [x: string]: string };
}

type LatLng = number;

export interface Country {
  country: string;
  capital: Capital[];
  latlng: LatLng[];
}

type Capital = string;
