export interface Countries {
  [x: string]: any;
  [index: number]: { [x: string]: string };
}

export interface Country {
  [countryName: string]: Capital[];
}
type Capital = string;
