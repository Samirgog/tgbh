export interface User {
  id: string;
  telegramId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  role: 'ADMIN' | 'STORE_OWNER' | 'CUSTOMER';
  ownedStores?: Store[];
  employeeAt?: Store[];
  orders?: Order[];
}

export interface Store {
  id: string;
  name: string;
  description?: string;
  bannerUrl?: string;
  bannerName?: string;
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'ARCHIVED';
  theme?: StoreTheme;
  owner: User;
  categories?: Category[];
  paymentMethods?: PaymentMethod[];
  deliveryMethods?: DeliveryMethod[];
  employees?: User[];
}

export interface StoreTheme {
  background?: string;
  accent?: string;
  cardBackground?: string;
  cardBorder?: string;
  general?: string;
  secondary?: string;
  white?: string;
}

export interface Category {
  id: string;
  name: string;
  priority?: number;
  imageUrl?: string;
  imageName?: string;
  products?: Product[];
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  imageUrl?: string;
  category?: Category;
}

export interface PaymentMethod {
  type: 'CASH' | 'CARD' | 'BANK_TRANSFER';
  condition: 'PREPAID' | 'POSTPAID';
  isEnabled: boolean;
}

export interface DeliveryMethod {
  receiveWay: 'PICKUP' | 'DELIVERY';
  details?: string;
  isEnabled: boolean;
}

export interface Order {
  id: string;
  user: User;
  store: Store;
  items: OrderItem[];
  statusHistory: OrderStatus[];
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  totalPrice: number;
  notes?: string;
}

export interface OrderStatus {
  id: string;
  status: string;
  notes?: string;
  changedAt: Date;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
} 