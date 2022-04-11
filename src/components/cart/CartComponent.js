import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList, Image, StyleSheet,
  Text, TouchableOpacity, View
} from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderBar, TextButton } from '../../components/common';
import { COLORS, IMAGES, SIZES } from '../../constants';
import { getAppThemeSelector } from '../../redux/selectors/themeSelector';
import ICONS from '../../constants/icons/index';
import {CartItemCard} from '../common';

const CartComponent = (props) => {
  const {
    cartInfo,
    totalCart,
    showPopup,
    handlerIncrementQuantity,
    handlerDecrementQuantity,
    handlerRemoveProductFromCart,
    setShowPopup,
  } = props;

  const appTheme = useSelector(getAppThemeSelector);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <HeaderBar>
        <View style={styles.titleContainer}>
          <Text style={styles.titleMain}>My Cart</Text>
          <Text style={styles.titleSub}>Check and pay your shoes</Text>
        </View>
      </HeaderBar>

      <View style={[styles.contentContainer, {backgroundColor: appTheme.backgroundColor}]}>
        {cartInfo?.carts?.length !== 0 ? 
          <View style={{flex: 1}}>
            <FlatList
              data={cartInfo?.carts}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.cartListContainer}
              ItemSeparatorComponent={() => <View style={{height: 10}} />}
              snapToInterval={140}
              renderItem={({item, index}) => (
                <CartItemCard
                  item={item}
                  index={index}
                  swiperIcon={ICONS.bin}
                  handlerDecrementQuantity={handlerDecrementQuantity}
                  handlerIncrementQuantity={handlerIncrementQuantity}
                  handlerRemoveProductFromCart={handlerRemoveProductFromCart}
                  setShowPopup={setShowPopup}
                  showPopup={showPopup}
                />
              )}
            />

            <View style={[styles.cartSubContent, {backgroundColor: appTheme.cartBackgroudColor}]}>
              <View style={styles.cartTotal}>
                <Text style={[styles.totalItem, {color: appTheme.textColor}]}>{cartInfo.numberCart} item</Text>
                <Text style={styles.totalPrice}>${totalCart}</Text>
              </View>

              <TextButton 
                title="Checkout"
                buttonContainerStyle={styles.buttonCheckout}
                titleStyle={styles.buttonText}
                onPress={() => navigation.navigate('PaymentScreen')}
              />
            </View>
          </View> :
          <View style={styles.cartEmptyContainer}>
            <Image source={IMAGES.empty_cart} style={styles.cartImage}/>

            <Text style={[styles.titleCartEmpty, {color: appTheme.textColor}]}>Your cart is empty</Text>
            
            <Text style={[styles.contentCartEmpty, {color: appTheme.textColor}]}>
              Looks like you haven't made your choice yet...
            </Text>
            
            <TouchableOpacity style={styles.backToHomeBtn} onPress={() => navigation.navigate('HomeScreen')}>
              <Text style={styles.goToShoppingButton}>Go To Shopping</Text>
            </TouchableOpacity>
          </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    marginTop: SIZES.radius,
    marginLeft: SIZES.padding
  },
  titleMain: {
    fontSize: SIZES.size_25,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
    color: COLORS.white
  },
  titleSub: {
    fontSize: SIZES.size_18,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
    color: COLORS.white
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    marginTop: -SIZES.size_20,
  },
  cartList: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
  },
  cartSubContent: {
    height: SIZES.size_180,
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
    borderTopRightRadius: SIZES.radius * 2,
    borderTopLeftRadius: SIZES.radius * 2,
    marginTop: SIZES.size_10,
    position: 'absolute',
    bottom: SIZES.size_50,
    left: 0,
    right: 0,
  },
  cartListContainer: {
    paddingTop: SIZES.radius,
    paddingBottom: SIZES.size_40,
    paddingHorizontal: SIZES.base
  },
  cartTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: SIZES.radius
  },
  totalItem: {
    fontSize: SIZES.size_22,
    fontFamily: 'Roboto Mono',
  },
  buttonCheckout: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.size_35,
    paddingVertical: SIZES.size_12,
    borderRadius: SIZES.radius * 2,
    marginTop: SIZES.size_15
  },
  buttonText: {
    fontSize: SIZES.size_22,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
    color: COLORS.white
  },
  cartEmptyContainer: {
    alignItems: 'center',
    marginTop: SIZES.size_100
  },
  cartImage: {
    width: SIZES.size_200,
    height: SIZES.size_200,
    marginLeft: -SIZES.size_40
  },
  titleCartEmpty: {
    fontSize: SIZES.size_30,
    marginTop: SIZES.size_10,
    marginBottom: SIZES.size_5,
    opacity: 0.8,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  contentCartEmpty: {
    fontSize: SIZES.size_20,
    textAlign: 'center',
    opacity: 0.5,
    fontFamily: 'Roboto Mono',
    paddingHorizontal: SIZES.size_5,
  },
  backToHomeBtn: {
    marginTop: SIZES.size_15,
    paddingVertical: SIZES.size_15,
    paddingHorizontal: SIZES.size_20,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },
  goToShoppingButton: {
    fontWeight: '500',
    fontSize: SIZES.size_20,
    color: COLORS.white
  },
  totalPrice: {
    fontSize: SIZES.size_20,
    fontFamily: 'Roboto Mono',
  }
});

export default CartComponent;
