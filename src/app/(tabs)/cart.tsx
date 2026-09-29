import { theme } from '@/constants/theme';
import { getProducts } from '@/services/productsApi';
import useCartStore from '@/store/cartStore';
import { CartItemWithDetails, mapCartItems } from '@/utils/cartUtils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
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

  const { cartItemsWithDetails, totalCost } = useMemo(
    () => mapCartItems(data, cart),
    [data, cart]
  );

  if (!hasHydrated) {
    return <Text>Loading Cart...</Text>;
  }

  if (cart.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyMessage}>
          Add some products to get started.
        </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.stateMessage}>Loading cart details...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Unable to load cart</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {cartItemsWithDetails.map((item: CartItemWithDetails) => {
        const { productId, subTotal, productDetails, quantity, isAvailable } =
          item;

        return (
          <View key={productId} style={styles.cartItem}>
            {isAvailable ? (
              <>
                <Text style={styles.productName}>{productDetails?.name}</Text>

                <Text style={styles.price}>₹{productDetails?.price}</Text>

                <View style={styles.quantityRow}>
                  <Pressable
                    onPress={() => decreaseQuantity(productId)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>−</Text>
                  </Pressable>

                  <Text style={styles.quantity}>{quantity}</Text>

                  <Pressable
                    onPress={() => increaseQuantity(productId)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>
                </View>

                <View style={styles.subtotalRow}>
                  <Text style={styles.subtotalLabel}>Subtotal</Text>
                  <Text style={styles.subtotalText}>₹{subTotal}</Text>
                </View>
              </>
            ) : (
              <View style={styles.unavailableContent}>
                <Text style={styles.unavailableTitle}>Product unavailable</Text>

                <Text style={styles.unavailableMessage}>
                  This product is no longer available.
                </Text>

                <Pressable
                  onPress={() => removeItem(productId)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>Remove Item</Text>
                </Pressable>
              </View>
            )}
          </View>
        );
      })}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>₹{totalCost}</Text>
        </View>

        <Pressable onPress={clearCart} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Empty Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },

  center: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },

  emptyTitle: {
    fontSize: theme.typography.heading,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },

  emptyMessage: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },

  stateMessage: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
  },

  errorTitle: {
    fontSize: theme.typography.heading,
    fontWeight: '700',
    color: theme.colors.danger,
    marginBottom: theme.spacing.xs,
  },

  errorMessage: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },

  cartItem: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },

  productName: {
    fontSize: theme.typography.body,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },

  price: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },

  quantityButton: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quantityButtonText: {
    fontSize: theme.typography.heading,
    color: theme.colors.text,
  },

  quantity: {
    minWidth: 24,
    textAlign: 'center',
    fontSize: theme.typography.body,
    fontWeight: '600',
    color: theme.colors.text,
  },

  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subtotalLabel: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
  },

  subtotalText: {
    fontSize: theme.typography.body,
    fontWeight: '700',
    color: theme.colors.text,
  },

  unavailableContent: {
    gap: theme.spacing.sm,
  },

  unavailableTitle: {
    fontSize: theme.typography.body,
    fontWeight: '600',
    color: theme.colors.danger,
  },

  unavailableMessage: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
  },

  removeButton: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.danger,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },

  removeButtonText: {
    fontSize: theme.typography.caption,
    fontWeight: '600',
    color: theme.colors.danger,
  },

  footer: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },

  totalLabel: {
    fontSize: theme.typography.heading,
    fontWeight: '600',
    color: theme.colors.text,
  },

  totalAmount: {
    fontSize: theme.typography.title,
    fontWeight: '700',
    color: theme.colors.text,
  },

  clearButton: {
    borderWidth: 1,
    borderColor: theme.colors.danger,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },

  clearButtonText: {
    fontSize: theme.typography.body,
    fontWeight: '600',
    color: theme.colors.danger,
  },
});
