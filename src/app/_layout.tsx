import { queryClient } from '@/lib/queryClient';
import useCartStore from '@/store/cartStore';
import { QueryClientProvider } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function RootLayout() {
  const cartItemCount = useCartStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerRight: () => (
            <Pressable
              onPress={() => router.navigate('/cart')}
              style={styles.headerRight}
            >
              <Text>🛒 </Text>
              {cartItemCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.cartItemCount}>{cartItemCount}</Text>
                </View>
              )}
            </Pressable>
          ),
        }}
      />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    position: 'relative',
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemCount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
