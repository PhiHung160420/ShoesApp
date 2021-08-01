import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {COLORS, SIZES} from '../../constants';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {getCartsSelector} from '../../redux/selectors/cartSelector';
import {getAllProduct} from '../../services/productAPI';
import ProductPrice from '../../components/ProductPrice';
import ProductItem from './ProductItem';

const CartScreen = ({navigation}) => {
  // get app theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // use dispatch
  const dispatch = useDispatch();

  const carts = useSelector(getCartsSelector);

  const [lstProductInCart, setLstProductInCart] = useState([]);

  useEffect(() => {
    setLstProductInCart(carts);
  }, [carts]);

  // render list product in cart
  const renderListProduct = ({item}) => {
    return <ProductItem item={item} />;
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
            {backgroundColor: appTheme.backgroundColor},
          ]}>
          <FlatList
            data={lstProductInCart}
            keyExtractor={item => item.id}
            renderItem={renderListProduct}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cartListContainer}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            snapToInterval={140}
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
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    marginTop: -20,
  },
  cartList: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  cartSubContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: SIZES.radius * 2,
    borderTopLeftRadius: SIZES.radius * 2,
    marginTop: 10,
  },
  cartListContainer: {
    paddingTop: 15,
    paddingBottom: 40,
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
