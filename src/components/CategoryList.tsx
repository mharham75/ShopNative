import { theme } from '@/constants/theme';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface CategoryListPropTypes {
  selectedCategory: string;
  onSelectCategory: (item: string) => void;
}

const CATEGORIES = ['Electronics', 'Grocery', 'Fashion', 'Beauty'];

const CategoryList = (props: CategoryListPropTypes) => {
  const { selectedCategory, onSelectCategory } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {CATEGORIES.map((item) => {
          const isSelected = selectedCategory === item;

          return (
            <Pressable
              key={item}
              onPress={() => onSelectCategory(item)}
              style={[styles.chip, isSelected && styles.selectedChip]}
            >
              <Text
                style={[styles.chipText, isSelected && styles.selectedChipText]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
        <Pressable
          onPress={() => onSelectCategory('')}
          style={styles.clearButton}
        >
          <Text style={styles.clearText}>Clear</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.lg,
  },

  title: {
    fontSize: theme.typography.heading,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },

  list: {
    gap: theme.spacing.sm,
  },

  chip: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.full,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },

  selectedChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },

  chipText: {
    fontSize: theme.typography.caption,
    color: theme.colors.text,
  },

  selectedChipText: {
    color: theme.colors.surface,
    fontWeight: '600',
  },

  clearButton: {
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
  },

  clearText: {
    fontSize: theme.typography.caption,
    color: theme.colors.danger,
  },
});
