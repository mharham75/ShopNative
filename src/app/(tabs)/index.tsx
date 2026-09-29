import CategoryList from '@/components/CategoryList';
import { ProductsList } from '@/components/ProductsList';
import { Searchbar } from '@/components/Searchbar';
import { useDebounce } from '@/hooks/useDebounce';
import { getProducts } from '@/services/productsApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Index() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 300 });
  const [selectedCategory, setSelectedCategory] = useState('');

  const {
    data: products,
    isError,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [
      'products',
      { searchTerm: debouncedSearchTerm, category: selectedCategory },
    ],
    queryFn: ({ signal }) =>
      getProducts(signal, {
        searchTerm: debouncedSearchTerm,
        category: selectedCategory,
      }),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

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

      {isLoading && <ActivityIndicator color={'#ddd'} size={'large'} />}
      {isError && <Text>{error.message}</Text>}
      {isError && (
        <Pressable onPress={() => refetch()}>
          <Text>Retry</Text>
        </Pressable>
      )}
      {isFetching && !isLoading && <Text>Updating products...</Text>}
      {!isLoading && !isError && products?.length === 0 && (
        <Text>No products found</Text>
      )}

      {!isLoading && !isError && products?.length > 0 && (
        <ProductsList products={products} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
