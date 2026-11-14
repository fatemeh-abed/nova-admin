export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  // Present on products returned by GET; absent on products created in this session.
  rating?: ProductRating;
}

// Body sent to POST /products.
export interface CreateProductRequest {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

// The mock API only guarantees an `id` in the POST response.
export interface CreateProductResponse {
  id: number;
}
