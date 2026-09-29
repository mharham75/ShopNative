import { theme } from '@/constants/theme';
import useCartStore from '@/store/cartStore';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Product } from '../data/products';

interface ProductsListPropTypes {
  products: Product[];
}

export const ProductsList = (props: ProductsListPropTypes) => {
  const { products } = props;

  const addItem = useCartStore((state) => state.addItem);

  return (
    <View style={styles.container}>
      {products.map((product) => {
        const { id, name, price } = product;

        return (
          <View key={id} style={styles.card}>
            <Link href={`/product/${id}`} style={styles.productLink}>
              <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>₹{price}</Text>
              </View>
            </Link>

            <Pressable onPress={() => addItem(id)} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.md,
  },

  card: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
  },

  productLink: {
    marginBottom: theme.spacing.md,
  },

  name: {
    fontSize: theme.typography.body,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },

  price: {
    fontSize: theme.typography.heading,
    fontWeight: '700',
    color: theme.colors.text,
  },

  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },

  addButtonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.body,
    fontWeight: '600',
  },
});
