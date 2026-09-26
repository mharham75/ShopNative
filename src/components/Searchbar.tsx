import { StyleSheet, TextInput, View } from 'react-native';

interface SearchbarPropTypes {
  searchTerm: string;
  onSearchChange: (item: string) => void;
}

export const Searchbar = (props: SearchbarPropTypes) => {
  const { searchTerm, onSearchChange } = props;

  return (
    <View>
      <TextInput
        placeholder="search products..."
        value={searchTerm}
        onChangeText={onSearchChange}
        style={styles.textInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 8,
    color: '#333',
    backgroundColor: '#ddd',
    borderColor: 'blue',
    borderWidth: 1,
    fontWeight: 800,
    borderRadius: 8,
  },
});
