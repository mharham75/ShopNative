import { theme } from '@/constants/theme';
import useCartStore from '@/store/cartStore';
import { Link } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Product } from '../data/products';

interface ProductCardPropTypes {
  product: Product;
}

export const ProductCard = (props: ProductCardPropTypes) => {
  const { product } = props;

  const addItem = useCartStore((state) => state.addItem);

  const { id, name, price, image, category } = product;

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Link href={`/product/${id}`} style={styles.productLink}>
        <View>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>₹{price}</Text>
        </View>
      </Link>

      <Pressable onPress={() => addItem(id)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 180,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
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

  category: {
    fontSize: theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
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
