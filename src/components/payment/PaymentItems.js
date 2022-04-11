import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS} from '../../constants';
import {SIZES} from '../../constants';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {useNavigation} from '@react-navigation/native';
import { TextButton } from '../common';

const ProductItem = ({item}) => {
  const appTheme = useSelector(getAppThemeSelector);

  return (
    <View style={[styles.productContainer, {backgroundColor: appTheme.viewBackground}]}>
      <Image source={{uri: item.image}} style={styles.imageStyle} />

      <View style={styles.productName}>
        <Text style={[styles.nameStyle, {color: appTheme.textColor}]}>{item.name}</Text>
      </View>

      <View style={styles.productQuantity}>
        <Text style={[styles.quantityStyle, {color: appTheme.textColor}]}>x {item.quantity}</Text>
      </View>

      <View style={styles.productPrice}>
        <Text style={[styles.priceStyle, {color: appTheme.textColor}]}>{item.price}$</Text>
      </View>
    </View>
  );
};

const ProductList = ({items}) => {
  const data = items.carts;

  const appTheme = useSelector(getAppThemeSelector);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Text style={[styles.titleStyle, {color: appTheme.textColor}]}>ITEMS</Text>
        <TextButton 
          title="Change"
          buttonContainerStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
          onPress={() => navigation.navigate('CartScreen')}
        />
      </View>
      
      <ScrollView>
        {data.map((item, index) => (
          <ProductItem item={item} key={index} appTheme={appTheme} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    marginTop: 5,
    height: 80,
  },
  imageStyle: {
    width: 100,
    height: 80,
  },
  productName: {
    width: 150,
  },
  nameStyle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginRight: 10,
    fontFamily: 'Roboto Mono',
  },
  productQuantity: {
    backgroundColor: COLORS.lightGray,
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  quantityStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
  productPrice: {
    marginRight: 10,
  },
  priceStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
  buttonStyle: {
    marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  buttonText: {
    fontSize: SIZES.size_16,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
    color: COLORS.white,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProductList;
