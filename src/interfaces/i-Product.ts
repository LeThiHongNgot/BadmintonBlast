import {IProductStock} from "./i-ProductStock";
export interface IProduct {
    idproduct: number; 
    idbrand: number; 
    idkindproduct: number;
    nameproduct: string; 
    kindproduct: string;
    namebrand: string;
    description: string;
    price: number; 
    available: number; 
    deprice: number;
    image: Image[]; 
    productstocks: IProductStock[]; 
}

interface Image {
    idproduct: number;
    image4?: string | null; 
    id: number;
  }