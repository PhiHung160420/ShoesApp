import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {COLORS, SIZES} from '../../constants';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {getOrderHistorySelector} from '../../redux/selectors/orderSelector';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import CustomStepIndicator from '../../components/customStepIndicator';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ProductOrder from './productOrder';
import {getProfileSelector} from '../../redux/selectors/profileSelector';
import {getInfoPaymentSelector} from '../../redux/selectors/paymentSelector';

const iconName = 'arrow-back-outline';

const OrderDetailScreen = ({route}) => {
  // get order id
  const {orderId} = route.params;

  // get theme from redux
  const appTheme = useSelector(getAppThemeSelector);

  // get profile from redux
  const profile = useSelector(getProfileSelector);

  // get ordersHistory
  const ordersHistory = useSelector(getOrderHistorySelector);

  // get order by id
  let result = ordersHistory.find(element => element.id == orderId);

  // state order detail
  const [order, setOrder] = useState(result);

  // state products in order detail
  const [productsOrdered, setProductsOrdered] = useState(order.orderDetail);

  return (
    <View style={styles.container}>
      <HeaderBar nameIcon={iconName}>
        <View style={styles.titleContainer}>
          <Text style={[styles.orderDetailTitle, {color: appTheme.textColor}]}>
            ORDER DETAIL
          </Text>
        </View>
      </HeaderBar>

      <ScrollView
        style={[
          styles.contentContainer,
          {backgroundColor: appTheme.backgroundColor},
        ]}
        contentContainerStyle={styles.orderContainer}
        showsVerticalScrollIndicator={false}>
        {/* ORDER INFO */}
        <View style={styles.orderInfo}>
          {/* ORDER ID */}
          <View style={styles.rowInfo}>
            <Text style={[styles.orderId, {color: appTheme.textColor}]}>
              Order ID: {order.id}
            </Text>
            <View style={styles.delivered}>
              <Feather name="check-square" size={20} color={COLORS.primary} />
              <Text style={styles.deliveredText}>Delivered</Text>
            </View>
          </View>
          {/* ORDER ID */}

          {/* ORDER DATE */}
          <Text style={[styles.orderDate, {color: appTheme.textColor}]}>
            Order Date: {moment(order.date).format('HH:MM A, DD/MM/YYYY')}
          </Text>
          {/* ORDER DATE */}
        </View>
        {/* ORDER INFO */}

        {/* ORDER TRACK */}
        <View
          style={[
            styles.trackContainer,
            {backgroundColor: appTheme.flatlistbackgroundItem},
          ]}>
          <View style={styles.trackTitleContainer}>
            <Feather name="truck" size={25} color={appTheme.textColor} />
            <Text style={[styles.trackTitle, {color: appTheme.textColor}]}>
              Order Track
            </Text>
          </View>
          <CustomStepIndicator appTheme={appTheme} />
        </View>
        {/* ORDER TRACK */}

        {/* DELIVERY INFO */}
        <View
          style={[
            styles.delivery,
            {backgroundColor: appTheme.flatlistbackgroundItem},
          ]}>
          {/* TITLE */}
          <View style={styles.deliveryTitleContainer}>
            <Feather name="map-pin" size={25} color={appTheme.textColor} />
            <Text style={[styles.deliveryTitle, {color: appTheme.textColor}]}>
              Delivery Location
            </Text>
          </View>
          {/* TITLE */}

          <View style={styles.deliveryInfoContainer}>
            {/* MAP */}
            <View style={styles.mapContainer}>
              <Image
                source={require('../../assets/images/map.jpg')}
                style={styles.mapStyle}
                resizeMode="contain"
              />
            </View>
            {/* MAP */}

            {/* INFO */}
            <View style={styles.deliveredInfo}>
              <Text style={[styles.deliveryName, {color: appTheme.textColor}]}>
                <Text style={{fontWeight: 'bold'}}>Name:</Text> {profile.name}
              </Text>
              <Text style={[styles.deliveryPhone, {color: appTheme.textColor}]}>
                <Text style={{fontWeight: 'bold'}}>Phone:</Text> {profile.phone}
              </Text>
              <Text
                style={[styles.deliveryAddress, {color: appTheme.textColor}]}>
                <Text style={{fontWeight: 'bold'}}>Address: </Text>
                112 Lý Chính Thắng, Quận 1, TP.HCM
              </Text>
            </View>
            {/* INFO */}
          </View>
        </View>
        {/* DELIVERY INFO */}

        {/* LIST ORDERED */}
        <View
          style={[
            styles.itemsContainer,
            {backgroundColor: appTheme.flatlistbackgroundItem},
          ]}>
          {/* TITLE */}
          <View style={styles.itemsTitleContainer}>
            <Feather name="clipboard" size={25} color={appTheme.textColor} />
            <Text style={[styles.itemsTitle, {color: appTheme.textColor}]}>
              Ordered List
            </Text>
          </View>
          {/* TITLE */}

          {/* ITEMS */}
          {productsOrdered.map(item => (
            <ProductOrder key={item.alias} item={item} appTheme={appTheme} />
          ))}
          {/* ITEMS */}
        </View>
        {/* LIST ORDERED */}

        {/* PAYMENT METHOD */}
        <View
          style={[
            styles.paymentMethod,
            {backgroundColor: appTheme.flatlistbackgroundItem},
          ]}>
          {/* TITLE */}
          <View style={styles.paymentTitleContainer}>
            <Feather name="printer" size={25} color={appTheme.textColor} />
            <Text
              style={[styles.paymentMethodTitle, {color: appTheme.textColor}]}>
              Payment Method
            </Text>
          </View>
          {/* TITLE */}

          {/* CONTENT */}
          <Text style={[styles.paymentContent, {color: appTheme.textColor}]}>
            Payment with credit card
          </Text>
          {/* CONTENT */}
        </View>
        {/* PAYMENT METHOD */}

        {/* ORDER TOTAL */}
        <View
          style={[
            styles.totalOrderContainer,
            {backgroundColor: appTheme.flatlistbackgroundItem},
          ]}>
          <View style={styles.totalItem}>
            <Text style={[styles.totalText, {color: appTheme.textColor}]}>
              Subtotal:
            </Text>
            <Text style={[styles.subTotalPrice, {color: appTheme.textColor}]}>
              $1000
            </Text>
          </View>
          <View style={styles.totalItem}>
            <Text style={[styles.totalText, {color: appTheme.textColor}]}>
              Delivery Cost:
            </Text>
            <Text style={[styles.subTotalPrice, {color: appTheme.textColor}]}>
              $100
            </Text>
          </View>
          <View style={styles.totalItem}>
            <Text style={[styles.totalText, {color: appTheme.textColor}]}>
              total:
            </Text>
            <Text style={[styles.subTotalPrice, {color: appTheme.textColor}]}>
              $900
            </Text>
          </View>
        </View>
        {/* ORDER TOTAL */}

        {/* BUTTON */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.ratingButton}>
            <Text style={styles.buttonText}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reOrderButton}>
            <Text style={styles.buttonText}>Re-Order</Text>
          </TouchableOpacity>
        </View>
        {/* BUTTON */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  orderDetailTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    marginTop: -40,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    paddingHorizontal: 10,
  },
  orderContainer: {
    paddingTop: 10,
    paddingBottom: 50,
  },
  mapContainer: {
    marginVertical: 5,
    marginLeft: 10,
  },
  mapStyle: {
    width: 120,
    height: 70,
    borderRadius: 10,
  },
  orderInfo: {
    marginTop: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '500',
  },
  orderDate: {
    fontSize: 15,
    fontWeight: '500',
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  delivered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveredText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 5,
    color: COLORS.primary,
  },
  trackContainer: {
    marginTop: 15,
    borderRadius: SIZES.radius,
  },
  trackTitleContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 10,
  },
  trackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  delivery: {
    marginTop: 15,
    borderRadius: SIZES.radius,
    paddingVertical: 10,
  },
  deliveryTitleContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  deliveryInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  deliveredInfo: {
    marginLeft: 10,
  },
  deliveryName: {
    fontSize: 16,
  },
  deliveryPhone: {
    fontSize: 16,
  },
  deliveryAddress: {
    fontSize: 16,
    width: 230,
  },
  itemsContainer: {
    marginTop: 15,
    borderRadius: SIZES.radius,
  },
  itemsTitleContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 10,
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  paymentMethod: {
    flexDirection: 'column',
    marginTop: 15,
    borderRadius: SIZES.radius,
  },
  paymentTitleContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 10,
  },
  paymentMethodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  paymentContent: {
    fontSize: 18,
    marginVertical: 5,
    marginLeft: 10,
    opacity: 0.7,
  },
  totalOrderContainer: {
    marginTop: 15,
    borderRadius: SIZES.radius,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  totalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '500',
  },
  subTotalPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 15,
  },
  ratingButton: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.silver,
  },
  reOrderButton: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default OrderDetailScreen;
