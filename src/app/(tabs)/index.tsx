import CategoryList from '@/components/CategoryList';
import { ProductCard } from '@/components/ProductCard';
import { Searchbar } from '@/components/Searchbar';
import { theme } from '@/constants/theme';
import { useDebounce } from '@/hooks/useDebounce';
import { getProducts } from '@/services/productsApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>

        <Pressable onPress={() => refetch()}>
          <Text>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No products found</Text>
        }
        ListHeaderComponent={
          <>
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
          </>
        }
      />
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

  list: {
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.body,
  },
});
