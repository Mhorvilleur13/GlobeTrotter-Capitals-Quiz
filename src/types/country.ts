type LatLng = number;

export interface Country {
  country: string;
  capital: Capital[];
  latlng: LatLng[];
  flag: string;
}

export type Capital = string;

export type RandomIndex = number;
