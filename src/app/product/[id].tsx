import { getProductById } from '@/services/productsApi';
import useCartStore from '@/store/cartStore';
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

const ProductDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const addItem = useCartStore((state) => state.addItem);

  const { isLoading, error, isError, data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 40 * 60 * 1000,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View>
      <Text>{id}</Text>
      <Text>{data?.name}</Text>
      <Text>{data?.category}</Text>
      <Text>{data?.price}</Text>
      <Pressable onPress={() => addItem(id)}>
        <Text>Add To Cart</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/cart')}>
        <Text>Go To Cart</Text>
      </Pressable>
    </View>
  );
};

export default ProductDetail;
