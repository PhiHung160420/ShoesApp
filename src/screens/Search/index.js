import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import HeaderBar from '../../components/HeaderBar';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {COLORS} from '../../constants/colors.constants';
import {SIZES} from '../../constants/sizes.constants';

const nameIcon = 'arrow-back-outline';

const SearchScreen = ({route}) => {
  const appTheme = useSelector(getAppThemeSelector);
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <HeaderBar>
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchStyle,
              {
                borderColor: appTheme.searchBackgroundColor,
                backgroundColor: appTheme.searchBackgroundColor,
              },
            ]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Find shoes"
              placeholderTextColor={COLORS.gray}
              onChangeText={val => handlerChangeValueSearch(val)}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() =>
                navigation.navigate('SearchScreen', {value: searchValue})
              }>
              <Feather name="search" size={25} color={appTheme.iconColor} />
            </TouchableOpacity>
          </View>
        </View>
      </HeaderBar>
      {/* HEADER */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  searchStyle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: SIZES.width / 2 + 50,
    borderRadius: 20,
    height: 40,
    borderWidth: 1,
  },
  searchInput: {
    fontSize: 15,
    width: SIZES.width / 2,
    height: 40,
    paddingLeft: 15,
    color: COLORS.black,
  },
  searchButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  contentContainer: {
    flex: 1,
    marginTop: -80,
    alignItems: 'center',
  },
  customStyle: {
    borderBottomLeftRadius: SIZES.radius * 3,
    borderBottomRightRadius: SIZES.radius * 3,
  },
  imageContainer: {
    height: 200,
    width: SIZES.width - 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius * 2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    position: 'relative',
  },
  imageStyle: {
    width: '90%',
    height: '90%',
  },
  productContent: {
    paddingTop: 15,
    marginTop: 20,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.radius * 3,
    borderTopRightRadius: SIZES.radius * 3,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  productPrice: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
  },
  descriptionText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptContent: {
    marginHorizontal: 20,
    fontSize: 18,
  },
  listSizeStyle: {
    marginVertical: 5,
    marginHorizontal: 5,
    paddingRight: 20,
  },
  sizeContainer: {
    marginTop: 25,
    marginLeft: 20,
  },
  sizeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sizeItemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  sizeItemText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  relatedContainer: {
    marginTop: 15,
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  relatedItem: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.darkgray,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  imageRelated: {
    width: 80,
    height: 50,
  },
  relatedListContainer: {
    marginHorizontal: 25,
    marginTop: 15,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addCardBtn: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkgray,
  },
  addCardStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buyProductBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 35,
    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyProductStyle: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  likeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
});

export default SearchScreen;
