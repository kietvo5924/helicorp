import { create } from "zustand";

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  isCartOpen: boolean;
  cartItems: CartItem[];
  cartItemCount: number;
  cartTotal: number;
  toggleCart: () => void;
  addToCart: (product: Product) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isCartOpen: false,
  cartItems: [],
  cartItemCount: 0,
  cartTotal: 0,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  addToCart: (product) => set((state) => {
    const existing = state.cartItems.find(item => item.id === product.id);
    let newItems;
    if (existing) {
      newItems = state.cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
      newItems = [...state.cartItems, { ...product, quantity: 1 }];
    }
    const count = newItems.reduce((acc, item) => acc + item.quantity, 0);
    const total = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return { cartItems: newItems, cartItemCount: count, cartTotal: total, isCartOpen: true };
  }),
}));
