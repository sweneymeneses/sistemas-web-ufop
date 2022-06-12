// ----------------------------------------------------------------------

export type PaymentType = 'paypal' | 'credit_card' | 'cash';

export type ProductStatus = 'sale' | 'new' | '';

export type ProductInventoryType = 'in_stock' | 'out_of_stock' | 'low_stock';

export type ProductCategory = 'Accessories' | 'Apparel' | 'Shoes' | string;

export type ProductGender = 'Men' | 'Women' | 'Kids' | string;

export type OnCreateBilling = (address: BillingAddress) => void;

export type ProductRating = {
  name: string;
  starCount: number;
  reviewCount: number;
};

export type ProductReview = {
  id: string;
  name: string;
  avatarUrl: string;
  comment: string;
  rating: number;
  isPurchased: boolean;
  helpful: number;
  postedAt: Date | string | number;
};

export type Product = {
  id: number;
  name: string;
  productCategoryId: number;
  internalCode: string;
  shortDescription?: string;
  description?: string;
  photo?: string;
  active: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type ProductManager = {
  id: string;
  name: string;
  code?: number | undefined;
  category?: number | undefined;
  internalCode: string;
  shortDescription: string;
  fullDescription?: string | undefined;
  cost: number | undefined;
  standardValue: number | undefined;
  profit?: number | undefined;
  obs?: string | undefined;
  photo: string | null;
  active: boolean;
  searchProducts?: string | undefined;
};

export type CartItem = {
  id: string;
  name: string;
  cover: string;
  available: number;
  price: number;
  color: string;
  size: string;
  quantity: number;
  subtotal: number;
};

export type BillingAddress = {
  receiver: string;
  phone: string;
  fullAddress: string;
  addressType: string;
  isDefault: boolean;
};

export type ProductState = {
  isLoading: boolean;
  error: Error | string | null;
  count: number;
  products: Product[];
  product: Product | null;
  sortBy: string | null;
};

export type ProductFilter = {
  gender: string[];
  category: string;
  colors: string[];
  priceRange: string;
  rating: string;
};

export type DeliveryOption = {
  value: number;
  title: string;
  description: string;
};

export type PaymentOption = {
  value: PaymentType;
  title: string;
  description: string;
  icons: string[];
};

export type CardOption = {
  value: string;
  label: string;
};
