import CategoryList from '@/components/CategoryList';
import { ProductsList } from '@/components/ProductsList';
import { Searchbar } from '@/components/Searchbar';
import { theme } from '@/constants/theme';
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
      <View style={styles.header}>
        <Text style={styles.title}>Shop Native</Text>

        <Text style={styles.subtitle}>
          Everything you need, delivered to your door.
        </Text>
      </View>

      <Searchbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <CategoryList
        selectedCategory={selectedCategory}
        onSelectCategory={handlePress}
      />

      {isLoading && (
        <ActivityIndicator color={theme.colors.primary} size="large" />
      )}
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
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },

  header: {
    marginBottom: theme.spacing.lg,
  },

  title: {
    fontSize: theme.typography.title,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },

  subtitle: {
    fontSize: theme.typography.body,
    color: theme.colors.textSecondary,
  },
});
