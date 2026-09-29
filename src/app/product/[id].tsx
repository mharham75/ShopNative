import { theme } from '@/constants/theme';
import { getProductById } from '@/services/productsApi';
import useCartStore from '@/store/cartStore';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const ProductDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const addItem = useCartStore((state) => state.addItem);

  const { isLoading, error, isError, data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 40 * 60 * 1000,
  });

  const handleAdd = (id: string) => {
    addItem(id);

    Alert.alert('Added to Cart', `${data?.name} has been added to your cart.`);
  };

  if (isLoading) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.stateContainer}>
        <Text style={styles.errorText}>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: data?.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.category}>{data?.category}</Text>

        <Text style={styles.name}>{data?.name}</Text>

        <Text style={styles.price}>₹{data?.price}</Text>

        <Pressable onPress={() => handleAdd(id)} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </Pressable>

        <Pressable
          onPress={() => router.navigate('/cart')}
          style={styles.cartButton}
        >
          <Text style={styles.cartButtonText}>Go to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  stateContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },

  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.body,
    textAlign: 'center',
  },

  image: {
    width: '100%',
    height: 300,
  },

  content: {
    padding: theme.spacing.lg,
  },

  category: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },

  name: {
    fontSize: theme.typography.title,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },

  price: {
    fontSize: theme.typography.heading,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
  },

  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },

  addButtonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.body,
    fontWeight: '600',
  },

  cartButton: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },

  cartButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.body,
    fontWeight: '600',
  },
});
