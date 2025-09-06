export interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  description?: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
}