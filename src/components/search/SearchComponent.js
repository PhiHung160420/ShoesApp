import React from 'react';
import {
  StyleSheet, TextInput, TouchableOpacity, View
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { HeaderBar, SearchInput } from '../../components/common';
import { SIZES, COLORS } from '../../constants';
import { getAppThemeSelector } from '../../redux/selectors/themeSelector';

const SearchComponent = () => {
  const appTheme = useSelector(getAppThemeSelector);

  return (
    <View style={styles.container}>
      <HeaderBar>
        <SearchInput placeholder="Find shoes" containerStyle={styles.searchContainer}/>
      </HeaderBar>
      <View style={[styles.content, {backgroundColor: appTheme.backgroundColor}]}>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    marginTop: SIZES.padding,
  },
  content: {
    flex: 1,
    marginTop: -SIZES.size_20,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
});

export default SearchComponent;
