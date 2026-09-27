import { create } from 'zustand';

type CartItem = {
  productId: string;
  quantity: number;
};

interface CartState {
  cart: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],

  addItem: (productId) =>
    set((state) => {
      const exists = state.cart.find((item) => item.productId === productId);
      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { productId, quantity: 1 }],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.productId !== productId),
    })),

  increaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQuantity: (productId) =>
    set((state) => {
      const targetItem = state.cart.find(
        (item) => item.productId === productId
      );

      if (!targetItem) {
        return state;
      }

      if (targetItem.quantity <= 1) {
        return {
          cart: state.cart.filter((item) => item.productId !== productId),
        };
      }

      return {
        cart: state.cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }),

  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
