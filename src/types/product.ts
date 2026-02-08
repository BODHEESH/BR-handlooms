export interface Product {
  _id?: string;
  name: string;
  fabric: string;
  color: string;
  price: string;
  compare_at_price?: number | string | null;
  stock: string;
  shipping?: string;
  description?: string;
  images?: string[];
  tags?: string[];
  weight?: number | string | null;
  blouse_price?: number | string | null;
  blouse_details?: string | null;
  featured?: boolean;
  new_arrival?: boolean;
  created_at?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
