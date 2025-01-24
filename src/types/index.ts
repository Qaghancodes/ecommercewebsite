export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  variants?: ProductVariant[];
  rating: number;
  reviews: Review[];
  stock: number;
  createdAt: Date;
}

export interface ProductVariant {
  id: string;
  color?: string;
  size?: string;
  stock: number;
  price?: number;
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  orders: Order[];
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  shippingAddress: Address;
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  variantId?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
} 