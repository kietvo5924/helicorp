import { create } from 'zustand';

interface AppState {
  cartItemCount: number;
  isCartOpen: boolean;
  incrementCart: () => void;
  toggleCart: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  cartItemCount: 0,
  isCartOpen: false,
  incrementCart: () => set((state) => ({ cartItemCount: state.cartItemCount + 1 })),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));
