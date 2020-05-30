import {environment} from '../environments/environment';



export const TVA = environment.TVA;

export const COM = environment.COMMISSION;

export const unitPrice = (price: number): string => {
  return price.toFixed(1);
};

export const totalPrice = (price: number, hours: number): string => {
  let result = price * hours;
  result += result / 100 * COM;
  result += result / 100 * TVA;
  return result.toFixed(1);
};

export const com = (price: number, hours: number): string => {
  return (price * hours / 100 * COM).toFixed(1);
};

export const tva = (price: number, hours: number): string => {
  let result = price * hours;
  result += result / 100 * COM;
  result = result / 100 * TVA;
  return result.toFixed(1);
};

