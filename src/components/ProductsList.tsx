import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { Product } from '../data/products';

interface ProductsListPropTypes {
  searchTerm: string;
  selectedCategory: string;
  products: Product[];
}

export const ProductsList = (props: ProductsListPropTypes) => {
  const { searchTerm, selectedCategory, products } = props;

  const filteredProducts = products?.filter((product: Product) => {
    if (searchTerm.length === 0 && selectedCategory.length === 0) {
      return true;
    }

    if (searchTerm.length === 0 && selectedCategory) {
      return product.category === selectedCategory;
    } else if (selectedCategory.length === 0 && searchTerm) {
      return product.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());
    }

    return (
      product.category === selectedCategory &&
      product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  });

  return (
    <ScrollView>
      <Pressable>
        <Text>Popular Products</Text>
      </Pressable>
      {filteredProducts.length === 0 ? (
        <Text>No product</Text>
      ) : (
        <>
          {filteredProducts.map((product: Product) => {
            const { id, name, category, price } = product;
            return (
              <Link key={id} style={styles.product} href={`/product/${id}`}>
                <Text>{name}</Text>
                <Text>{price}</Text>
              </Link>
            );
          })}
        </>
      )}
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
