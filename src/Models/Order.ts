import { Product, Store, User } from "./User";

export type Order = {
    id: string;
    user: User;
    store: Store;
    items: OrderItem[];
    statusHistory: OrderStatus[];
    totalAmount: number;
    status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
  }
  
  export type OrderItem = {
    id: string;
    product: Product;
    quantity: number;
    price: number;
    totalPrice: number;
    notes?: string;
  }
  
  export type OrderStatus = {
    id: string;
    status: string;
    notes?: string;
    changedAt: Date;
  }