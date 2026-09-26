import CategoryList from '@/components/CategoryList';
import { ProductsList } from '@/components/ProductsList';
import { Searchbar } from '@/components/Searchbar';
import { Product } from '@/data/products';
import { getProducts } from '@/services/productsApi';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Index() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  async function fetchProducts() {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      setError('');
      setLoading(true);
      const response = await getProducts(controller.signal);
      setProducts(response);
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }
      setError('error while fetching products');
    } finally {
      if (controllerRef.current === controller) {
        setLoading(false);
        controllerRef.current = null;
      }
    }
  }

  useEffect(() => {
    fetchProducts();

    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, []);

  const handlePress = (selectedItem: string) => {
    setSelectedCategory(selectedItem);
  };

  return (
    <View style={styles.container}>
      <Text>Shop Native</Text>
      <Text>Everything you need, delivered to your door.</Text>

      <Searchbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <CategoryList
        selectedCategory={selectedCategory}
        onSelectCategory={handlePress}
      />

      {loading && <ActivityIndicator color={'#ddd'} size={'large'} />}
      {error && <Text>{error}</Text>}
      {error && (
        <Pressable onPress={fetchProducts}>
          <Text>Retry</Text>
        </Pressable>
      )}
      {!loading && !error && (
        <ProductsList
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          products={products}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
