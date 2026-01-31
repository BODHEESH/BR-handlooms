export interface Product {
  _id?: string;
  name: string;
  fabric: string;
  color: string;
  price: string;
  stock: string;
  shipping?: string;
  description?: string;
  images?: string[];
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
