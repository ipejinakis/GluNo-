import { create } from 'zustand';

interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: any) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (product) => set((state) => {
    const existing = state.cart.find((item) => item.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map((item) =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        ),
      };
    }
    return { cart: [...state.cart, { ...product, cantidad: 1 }] };
  }),
  removeFromCart: (product: CartItem) => set((state) => {
  const existing = state.cart.find((item) => item.id === product.id);

  if (!existing) return state;

  if (existing.cantidad > 1) {
    return {
      cart: state.cart.map((item) =>
        item.id === product.id 
          ? { ...item, cantidad: item.cantidad - 1 } 
          : item
      ),
    };
  }

  return {
    cart: state.cart.filter((item) => item.id !== product.id),
  };
  }),
  clearCart: () => set({ cart: [] }),
}));