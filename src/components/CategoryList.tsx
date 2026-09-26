import { Pressable, StyleSheet, Text, View } from 'react-native';

interface CategoryListPropTypes {
  selectedCategory: string;
  onSelectCategory: (item: string) => void;
}

const CategoryList = (props: CategoryListPropTypes) => {
  const { selectedCategory, onSelectCategory } = props;
  return (
    <View style={styles.products}>
      <Text>Categories</Text>
      {['Electronics', 'Grocery', 'Fashion', 'Beauty'].map((item) => (
        <Pressable
          key={item}
          onPress={() => onSelectCategory?.(item)}
          style={[
            styles.product,
            selectedCategory === item && { backgroundColor: '#7c8bd4ff' },
          ]}
        >
          <Text>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  products: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 18,
  },
  product: {
    backgroundColor: '#93bce8ff',
    borderColor: 'blue',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
    fontWeight: 700,
  },
});
