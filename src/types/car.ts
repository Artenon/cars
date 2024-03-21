export interface ICar {
  id: number;
  images: string[];
  name: string;
  description: string;
  price: number;
  contacts: string;
  technical_characteristics?: TechnicalCharacteristics;
  options?: Option[];
}

export interface TechnicalCharacteristics {
  car_id: number;
  brand: string;
  model: string;
  productionYear: number;
  body: string;
  mileage: number;
}

export interface Option {
  option_name: string;
}

export interface IFilter {
  brand: string;
  model: string;
  productionYear: number;
  body: string;
  mileage: { from: number; to: number };
  price: { from: number; to: number };
}
