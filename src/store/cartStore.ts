import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type CartItem = {
  productId: string;
  quantity: number;
};

interface CartState {
  cart: CartItem[];
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      addItem: (productId) =>
        set((state) => {
          const exists = state.cart.find(
            (item) => item.productId === productId
          );
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
    }),
    {
      name: 'shopnative-cart',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        cart: state.cart,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (!error) {
            state?.setHasHydrated(true);
          }
        };
      },
    }
  )
);

export default useCartStore;
