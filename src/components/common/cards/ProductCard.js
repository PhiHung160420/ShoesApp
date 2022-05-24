import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SIZES } from '../../../constants';
import { fetchProductsFavoriteAction, saveProductFavoriteAction } from '../../../redux/actions/productAction';
import { accessTokenSelector } from '../../../redux/selectors/authSelector';
import { appThemeSelector } from '../../../redux/selectors/themeSelector';
import {
  likeProductAPI,
  unLikeProductAPI
} from '../../../services/productAPI';

const ProductCard = ({product, isLiked}) => {
  const appTheme = useSelector(appThemeSelector);
  
  const navigation = useNavigation();

  const accessToken = useSelector(accessTokenSelector);

  const dispatch = useDispatch();

  const handlerClickLikeProduct = () => {
    if (isLiked) {
      unLikeProductAPI(product.id, accessToken)
        .then(res => dispatch(fetchProductsFavoriteAction(accessToken)))
        .catch(err => console.log(err));
    } else {
      likeProductAPI(product.id, accessToken)
        .then(res => dispatch(fetchProductsFavoriteAction(accessToken)))
        .catch(err => console.log(err));
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.productItem,
        {
          backgroundColor: appTheme.flatlistbackgroundItem,
          shadowColor: appTheme.shadowColor,
        },
      ]}
      onPress={() =>
        navigation.navigate('ProducDetailScreen', {item: product})
      }>
      <View style={styles.productItemHeader}>
        <View style={styles.productPriceLeftContent}>
          <MatIcon name="attach-money" size={18} color={appTheme.textColor} />
          <Text
            style={[styles.productPriceText, {color: appTheme.textColor}]}>
            {product.price}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconStyle}
          onPress={handlerClickLikeProduct}>
          <FontAwesome
            name={isLiked == true ? 'heart' : 'heart-o'}
            color={isLiked ? COLORS.red : appTheme.textColor}
            size={25}
          />
        </TouchableOpacity>
      </View>

      <Image source={{uri: product.image}} style={[styles.productImage]} />

      <Text style={[styles.productName, {color: appTheme.textColor}]}>
        {product.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productItem: {
    justifyContent: 'center',
    width: (SIZES.deviceWidth - 40) / 2,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    marginHorizontal: 10,
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
    alignItems: 'center',
  },
  productPriceLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPriceText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  productImage: {
    width: 170,
    height: 135,
    alignSelf: 'center',
  },
  productName: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '500',
    height: 50,
    fontFamily: 'Roboto Mono',
  },
});

export default ProductCard;
