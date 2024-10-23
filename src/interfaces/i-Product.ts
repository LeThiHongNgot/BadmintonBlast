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
    date:Date;
    image: Image[]; 
    productstocks: IProductStock[]; 
}

interface Image {
    idproduct: number;
    image4?: File | null; 
    id: number;
  }