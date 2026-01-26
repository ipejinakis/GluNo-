import { create } from 'zustand';

interface CartItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  precioBulto: number;
  unidadXbulto: number;
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

    const factorBulto = product.unidadXbulto || 1;
    const precioPorBulto = product.precio * factorBulto;

    if (existing) {
      return {
        cart: state.cart.map((item) =>
          // item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
          item.id === product.id 
            ? { ...item, cantidad: item.cantidad + 1, precioBulto: precioPorBulto } 
            : item
        ),
      };
    }
    return { 
      // cart: [...state.cart, { ...product, cantidad: 1 }] 
    cart: [...state.cart, { ...product, cantidad: 1, precioBulto: precioPorBulto }]
  
    };
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