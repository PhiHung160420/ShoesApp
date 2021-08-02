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
import {setCartsToStorage} from '../../utils/storage';

const CartScreen = ({navigation}) => {
  // get app theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // use dispatch
  const dispatch = useDispatch();

  // get cart info from redux
  const cartsInfo = useSelector(getCartsSelector);

  // total price
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    cartsInfo.carts.forEach(item => {
      totalPrice += item.quantity * item.price;
      setTotalCart(totalPrice);
    });

    // save carts to storage
    const handlerSaveCartToStorage = async data => {
      return await setCartsToStorage(data);
    };

    handlerSaveCartToStorage(JSON.stringify(cartsInfo));
  }, [cartsInfo]);

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
        {cartsInfo.carts.length !== 0 ? (
          <>
            <View
              style={[
                styles.cartList,
                {backgroundColor: appTheme.backgroundColor},
              ]}>
              <FlatList
                data={cartsInfo.carts}
                keyExtractor={item => item.id}
                renderItem={renderListProduct}
                horizontal={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.cartListContainer}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
                snapToInterval={140}
              />
            </View>

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
                  {cartsInfo.numberCart} item
                </Text>
                <ProductPrice>{totalCart}</ProductPrice>
              </View>
              <View style={styles.checkoutButton}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => navigation.navigate('PaymentScreen')}>
                  <Text
                    style={[styles.buttonText, {color: appTheme.textColor}]}>
                    Checkout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.cartImageContainer}>
            <Image
              source={require('../../assets/images/empty-cart.png')}
              style={styles.cartImage}
            />
            <Text style={[styles.titleCartEmpty, {color: appTheme.textColor}]}>
              Your cart is empty
            </Text>
            <Text
              style={[styles.contentCartEmpty, {color: appTheme.textColor}]}>
              Looks like you haven't made your choice yet...
            </Text>
            <TouchableOpacity
              style={styles.backToHomeBtn}
              onPress={() => navigation.navigate('HomeScreen')}>
              <Text style={styles.btnBackToHomeContent}>Back To Home</Text>
            </TouchableOpacity>
          </View>
        )}
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
  cartImageContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 100,
  },
  cartImage: {
    width: 200,
    height: 200,
  },
  titleCartEmpty: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 5,
    opacity: 0.8,
    fontWeight: '500',
  },
  contentCartEmpty: {
    fontSize: 20,
    textAlign: 'center',
    opacity: 0.5,
  },
  backToHomeBtn: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },
  btnBackToHomeContent: {
    fontWeight: '500',
    fontSize: 20,
  },
});

export default CartScreen;
