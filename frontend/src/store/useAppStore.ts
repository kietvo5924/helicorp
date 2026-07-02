import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  tag?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selected?: boolean;
}

interface AppState {
  isCartOpen: boolean;
  cartItems: CartItem[];
  cartItemCount: number;
  cartTotal: number;
  favorites: number[];
  toggleCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  toggleFavorite: (productId: number) => void;
  toggleCartItemSelection: (productId: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isCartOpen: false,
      cartItems: [],
      cartItemCount: 0,
      cartTotal: 0,
      favorites: [],
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      addToCart: (product) => set((state) => {
        const existing = state.cartItems.find(item => item.id === product.id);
        let newItems;
        if (existing) {
          newItems = state.cartItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        } else {
          newItems = [...state.cartItems, { ...product, quantity: 1, selected: true }];
        }
        
        const count = newItems.reduce((acc, item) => acc + item.quantity, 0);
        const total = newItems.filter(item => item.selected !== false).reduce((acc, item) => acc + (item.price * item.quantity), 0);
        return { cartItems: newItems, cartItemCount: count, cartTotal: total, isCartOpen: true };
      }),
  removeFromCart: (productId) => set((state) => {
    const existing = state.cartItems.find(item => item.id === productId);
    if (!existing) return state;
    
    let newItems;
    if (existing.quantity > 1) {
      newItems = state.cartItems.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item);
    } else {
      newItems = state.cartItems.filter(item => item.id !== productId);
    }
    
    const count = newItems.reduce((acc, item) => acc + item.quantity, 0);
    const total = newItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return { cartItems: newItems, cartItemCount: count, cartTotal: total };
  }),
  toggleFavorite: (productId) => set((state) => {
    const isFav = state.favorites.includes(productId);
    if (isFav) {
      return { favorites: state.favorites.filter(id => id !== productId) };
    } else {
      return { favorites: [...state.favorites, productId] };
    }
  }),
}), {
  name: 'helicorp-storage',
  partialize: (state) => ({ 
    cartItems: state.cartItems, 
    cartItemCount: state.cartItemCount, 
    cartTotal: state.cartTotal, 
    favorites: state.favorites 
  }),
})
);
