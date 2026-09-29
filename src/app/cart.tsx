import { getProducts } from '@/services/productsApi';
import useCartStore from '@/store/cartStore';
import { CartItemWithDetails, mapCartItems } from '@/utils/cartUtils';
import { useQuery } from '@tanstack/react-query';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Cart = () => {
  const cart = useCartStore((state) => state.cart);
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const removeItem = useCartStore((state) => state.removeItem);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: ({ signal }) => getProducts(signal),
    staleTime: 5 * 60 * 1000,
  });

  const { cartItemsWithDetails, totalCost } = mapCartItems(data, cart);

  if (!hasHydrated) {
    return <Text>Loading Cart...</Text>;
  }

  if (cart.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading cart details...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error?.message}</Text>
      </View>
    );
  }

  return (
    <View>
      {cartItemsWithDetails.map((item: CartItemWithDetails) => {
        const { productId, subTotal, productDetails, quantity, isAvailable } =
          item;

        return (
          <View key={productId}>
            {isAvailable ? (
              <>
                <Text>name : {productDetails?.name}</Text>
                <Text>₹{productDetails?.price}</Text>
                <Text>quantity : {quantity}</Text>
                <Text>Subtotal : {subTotal}</Text>

                <Pressable onPress={() => increaseQuantity(productId)}>
                  <Text>+</Text>
                </Pressable>

                <Pressable onPress={() => decreaseQuantity(productId)}>
                  <Text>-</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text>Product unavailable</Text>
                <Text>This product is no longer available.</Text>
                <Pressable onPress={() => removeItem(productId)}>
                  <Text>Remove Item</Text>
                </Pressable>
              </>
            )}
          </View>
        );
      })}
      <View>
        <Text>Total Cost {totalCost}</Text>
      </View>
      <Pressable onPress={() => clearCart()}>
        <Text>Empty Cart</Text>
      </Pressable>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: { fontSize: 24, fontWeight: 'bold', padding: 20, paddingBottom: 10 },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  cartItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  priceBreakdown: { fontSize: 14, color: '#666' },
  subtotalText: { fontWeight: '700', color: '#111' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fafafa',
  },
  totalLabel: { fontSize: 18, fontWeight: '600', color: '#333' },
  totalAmount: { fontSize: 22, fontWeight: 'bold', color: '#2ecc71' },
  errorText: { color: 'red', fontSize: 16 },
  emptyText: { fontSize: 16, color: '#888' },
});
