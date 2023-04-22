type LatLng = number;

export interface Country {
  country: string;
  capital: Capital[];
  latlng: LatLng[];
}

type Capital = string;
