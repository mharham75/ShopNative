import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchbarPropTypes {
  searchTerm: string;
  onSearchChange: (item: string) => void;
}

export const Searchbar = (props: SearchbarPropTypes) => {
  const { searchTerm, onSearchChange } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <Ionicons
        name="search-outline"
        size={20}
        color={isFocused ? theme.colors.primary : theme.colors.muted}
      />
      <TextInput
        placeholder="Search products..."
        placeholderTextColor={theme.colors.muted}
        value={searchTerm}
        onChangeText={onSearchChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.md,
  },
  containerFocused: {
    borderColor: theme.colors.primary,
  },
  textInput: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    fontSize: theme.typography.body,
    color: theme.colors.text,
  },
});
