import { getProducts } from '@/services/productsApi';
import useCartStore from '@/store/cartStore';
import { useQuery } from '@tanstack/react-query';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useCartStore(
    (state) => state
  );

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: ({ signal }) => getProducts(signal),
    staleTime: 5 * 60 * 1000,
  });

  const mapZustandToTanstackData = cart.map((cartItem) => {
    const productDetails = data?.find((item) => item.id === cartItem.productId);
    return {
      ...cartItem,
      productDetails,
      subTotal: (productDetails?.price ?? 0) * cartItem.quantity,
    };
  });

  const totalCost = mapZustandToTanstackData.reduce(
    (total, item) => total + item.subTotal,
    0
  );

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
      {mapZustandToTanstackData.map((item) => {
        const { productId, subTotal, productDetails, quantity } = item;
        return (
          <View key={productId}>
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
          </View>
        );
      })}
      <View>
        <Text>Total Cost {totalCost}</Text>
      </View>
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
