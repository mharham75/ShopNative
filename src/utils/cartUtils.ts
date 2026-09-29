import { Product } from '@/data/products';
import { CartItem } from '@/store/cartStore';

export type CartItemWithDetails = CartItem & {
  isAvailable?: boolean;
  subTotal?: number | null;
  productDetails?: Product;
};

export const mapCartItems = (
  products: Product[] | undefined,
  cartItems: CartItemWithDetails[]
) => {
  const cartItemsWithDetails = cartItems.map(
    (cartItem: CartItemWithDetails) => {
      const productDetails = products?.find(
        (item) => item.id === cartItem.productId
      );
      return {
        ...cartItem,
        productDetails,
        isAvailable: !!productDetails,
        subTotal: productDetails
          ? productDetails.price * cartItem.quantity
          : null,
      };
    }
  );

  const availableItems = cartItemsWithDetails.filter(
    (item: CartItemWithDetails) => item.isAvailable
  );
  const unavailableItems = cartItemsWithDetails.filter(
    (item: CartItemWithDetails) => !item.isAvailable
  );

  const totalCost = availableItems.reduce(
    (total, item) => total + (item.subTotal ?? 0),
    0
  );

  return {
    cartItemsWithDetails,
    totalCost,
    availableItems,
    unavailableItems,
  };
};
