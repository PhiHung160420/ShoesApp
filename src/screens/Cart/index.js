import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {COLORS, SIZES} from '../../constants';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {getAllProduct} from '../../services/productAPI';
import ProductPrice from '../../components/ProductPrice';
import ProductItem from './ProductItem';

const CartScreen = ({navigation}) => {
  // get app theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // state list product
  const [listProduct, setListProduct] = useState([]);

  // handler get list product from api
  useEffect(() => {
    getAllProduct()
      .then(res => setListProduct(res.data.content))
      .catch(err => console.log(err));
  }, []);

  // convert string to object
  const convertStringToArray = values => {
    // convert to list number
    const JSONString = values;
    let object = JSON.parse(JSONString);
    let array = Object.keys(object).map(k => {
      return object[k];
    });
    // convert list number to list string
    let listString = [];
    array.forEach(e => listString.push(e.toString()));
    return listString;
  };

  // render list product in cart
  const renderListProduct = ({item}) => {
    const listSize = convertStringToArray(item.size);
    return <ProductItem listSize={listSize} item={item} />;
  };

  return (
    <View style={styles.container}>
      {/* HEADER BAR */}
      <HeaderBar>
        <View style={styles.cartTitle}>
          <Text style={[styles.titleMain, {color: appTheme.textColor}]}>
            My Cart
          </Text>
          <Text style={[styles.titleSub, {color: appTheme.textColor}]}>
            Check and pay your shoes
          </Text>
        </View>
      </HeaderBar>
      {/* HEADER BAR */}

      {/* CART LIST */}
      <View
        style={[
          styles.cartContent,
          {backgroundColor: appTheme.backgroundColor},
        ]}>
        {/* LIST PRODUCT */}
        <View
          style={[
            styles.cartList,
            {backgroundColor: appTheme.cardBackgroundColor},
          ]}>
          <FlatList
            data={listProduct}
            keyExtractor={item => item.id}
            renderItem={renderListProduct}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cartListContainer}
            ItemSeparatorComponent={() => <View style={{height: 15}} />}
            snapToInterval={145}
          />
        </View>
        {/* LIST PRODUCT */}

        {/* TOTAL - BUTTON CHECKOUT */}
        <View
          style={[
            styles.cartSubContent,
            {
              backgroundColor:
                appTheme.name == 'dark' ? COLORS.gray : COLORS.gainsboro,
            },
          ]}>
          <View style={styles.cartTotal}>
            <Text style={[styles.totalItem, {color: appTheme.textColor}]}>
              5 item
            </Text>
            <ProductPrice>500</ProductPrice>
          </View>
          <View style={styles.checkoutButton}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('PaymentScreen')}>
              <Text style={[styles.buttonText, {color: appTheme.textColor}]}>
                Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* TOTAL - BUTTON CHECKOUT */}
      </View>
      {/* CART LIST */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartTitle: {
    marginTop: 5,
    marginLeft: 10,
  },
  titleMain: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  titleSub: {
    fontSize: 15,
    fontWeight: '500',
  },
  cartContent: {
    flex: 2,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    marginTop: -20,
  },
  cartList: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
  },
  cartSubContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: SIZES.radius,
    borderTopLeftRadius: SIZES.radius,
    marginTop: 10,
  },
  cartListContainer: {
    paddingTop: 15,
    paddingBottom: 30,
    width: SIZES.width,
    paddingHorizontal: 5,
  },
  cartTotal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 20,
    marginHorizontal: 20,
  },
  totalItem: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    flex: 3,
  },
  buttonContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 35,
    paddingVertical: 12,
    borderRadius: SIZES.radius * 2,
    marginTop: -5,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '500',
  },
});

export default CartScreen;
