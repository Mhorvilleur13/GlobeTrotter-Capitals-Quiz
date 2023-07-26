type LatLng = number;

export interface Country {
  country: string;
  capital: Capital[];
  latlng: LatLng[];
  flag: string;
  area: number;
  wasClicked: boolean;
}

export type Capital = string;

export type RandomIndex = number;
