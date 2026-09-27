import { getProductById } from '@/services/productsApi';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const ProductDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

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

  console.log('data :: ', data);

  return (
    <View>
      <Text>{id}</Text>
      <Text>{data?.name}</Text>
      <Text>{data?.category}</Text>
      <Text>{data?.price}</Text>
    </View>
  );
};

export default ProductDetail;
