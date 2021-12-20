import { Product } from "@/models/product.model";

export interface CartProduct {
  product: Product;
  numItems: number;
}

export interface RootState {
  products: Product[];
  StoreCart: CartProduct[];
}
