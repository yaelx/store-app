import { Product } from "../types/Product";

export const sortByName = (a: Product, b: Product) => {
  if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  }
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  }
  return 0;
};

export const sortByDate = (a: Product, b: Product) => {
    const aDate = new Date(a.creation_date); // dateObject
    const bDate = new Date(b.creation_date);
  if (aDate.getTime() > bDate.getTime()) { // timestamp compare
    return 1; 
  }
  if (aDate.getTime() < bDate.getTime()) {
    return -1;
  }
  return 0;
};

export const sortByPrice = (a: Product, b: Product) => {
  if (a.price > b.price) {
    return 1; 
  }
  if (a.price < b.price) {
    return -1;
  }
  return 0;
};

