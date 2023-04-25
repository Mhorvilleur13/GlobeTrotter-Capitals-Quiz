type LatLng = number;

export interface Country {
  country: string;
  capital: Capital[];
  latlng: LatLng[];
  flag: string;
}

type Capital = string;
