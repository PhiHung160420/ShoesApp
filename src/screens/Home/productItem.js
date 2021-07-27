import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, SIZES} from '../../constants';

const ProductItem = ({product, appTheme}) => {
  // use navigation
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.productItem,
        {
          backgroundColor:
            appTheme.name == 'dark' ? COLORS.gray3 : COLORS.gainsboro,
          shadowColor:
            appTheme.name == 'dark' ? COLORS.lightGray2 : COLORS.gray3,
        },
      ]}
      onPress={() =>
        navigation.navigate('ProducDetailScreen', {productId: product.id})
      }>
      <View style={styles.productItemHeader}>
        <View style={styles.productPriceLeftContent}>
          <MatIcon name="attach-money" size={18} color={appTheme.textColor} />
          <Text style={[styles.productPriceText, {color: appTheme.textColor}]}>
            {product.price}
          </Text>
        </View>
        <TouchableOpacity>
          <Feather
            name="heart"
            color={appTheme.name == 'dark' ? 'white' : 'black'}
            size={25}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{uri: product.image}}
        style={[
          styles.productImage,
          {
            shadowColor:
              appTheme.name == 'dark' ? COLORS.gainsboro : COLORS.black,
          },
        ]}
      />
      <Text style={[styles.productName, {color: appTheme.textColor}]}>
        {product.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productItem: {
    justifyContent: 'center',
    width: (SIZES.width - 80) / 2,
    paddingHorizontal: 10,
    height: 190,
    marginBottom: 25,
    marginHorizontal: 15,
    borderRadius: 15,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 1,
  },
  productItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productPriceLeftContent: {
    flexDirection: 'row',
  },
  productPriceText: {
    fontWeight: 'bold',
  },
  productImage: {
    width: 150,
    height: 110,
    alignSelf: 'center',
    shadowOffset: {
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  productName: {
    fontSize: 16,
    height: 40,
    fontWeight: '500',
  },
});

export default ProductItem;
