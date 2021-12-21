export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}
export interface CartProduct {
  product: Product;
  amount: number;
}

export interface RootState {
  products: Product[];
  StoreCart: CartProduct[];
}
