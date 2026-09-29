import useCartStore from '@/store/cartStore';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Product } from '../data/products';

interface ProductsListPropTypes {
  products: Product[];
}

export const ProductsList = (props: ProductsListPropTypes) => {
  const { products } = props;

  const addItem = useCartStore((state) => state.addItem);

  return (
    <ScrollView>
      {products.map((product: Product) => {
        const { id, name, price } = product;
        return (
          <View key={id}>
            <Link style={styles.product} href={`/product/${id}`}>
              <Text>{name}</Text>
              <Text>{price}</Text>
            </Link>
            <Pressable onPress={() => addItem(id)}>
              <Text>Add To Cart</Text>
            </Pressable>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  product: {
    backgroundColor: '#bde2ebff',
    padding: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'green',
    margin: 12,
    borderRadius: 12,
  },
});
