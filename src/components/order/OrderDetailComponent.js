import moment from 'moment';
import React from 'react';
import {
  Image,
  ScrollView, StyleSheet,
  Text, View
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { HeaderBar, IconLabel, StepOrders } from '../../components/common';
import { COLORS, ICONS, IMAGES, SIZES } from '../../constants';
import { appThemeSelector } from '../../redux/selectors/themeSelector';

const OrderDetailComponent = (props) => {
  const {
    profile,
    order,
    productsOrdered,
  } = props;

  const appTheme = useSelector(appThemeSelector);

  return (
    <View style={styles.container}>
      <HeaderBar nameIcon={ICONS.arrow_back}>
        <View style={styles.titleContainer}>
          <Text style={styles.orderDetailTitle}>ORDER DETAIL</Text>
        </View>
      </HeaderBar>

      <ScrollView
        style={[styles.contentContainer, {
          backgroundColor: appTheme.backgroundColor
        }]}
        contentContainerStyle={styles.orderContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.orderInfo}>
          <View style={styles.rowInfo}>
            <Text style={[styles.orderId, {color: appTheme.textColor}]}>Order ID: {order.id}</Text>
            
            <View style={styles.delivered}>
              <Feather name="check-square" size={20} color={COLORS.primary} />
              <Text style={styles.deliveredText}>Delivered</Text>
            </View>
          </View>

          <Text style={[styles.orderDate, {color: appTheme.textColor}]}>
            Order Date: {moment(order.date).format('HH:MM A, DD/MM/YYYY')}
          </Text>
        </View>

        <View style={[styles.trackContainer, {backgroundColor: appTheme.flatlistbackgroundItem}]}>
          <IconLabel 
            icon="truck"
            label="Order Track"
            conatainerStyle={styles.iconLabelContainer}
            labelStyle={styles.iconLabelStyle}
          />

          <StepOrders appTheme={appTheme} />
        </View>

        <View style={[styles.delivery, {backgroundColor: appTheme.flatlistbackgroundItem}]}>
          <IconLabel 
            icon="map-pin"
            label="Delivery Location"
            conatainerStyle={styles.iconLabelContainer}
            labelStyle={styles.iconLabelStyle}
          />

          <View style={styles.deliveryInfoContainer}>
            <TouchableOpacity style={styles.mapContainer} onPress={() => navigation.navigate('MapScreen')}>
              <Image source={IMAGES.map} style={styles.mapStyle} resizeMode="contain"/>
            </TouchableOpacity>

            <View style={styles.deliveredInfo}>
              <Text style={[styles.deliveryName, {color: appTheme.textColor}]}>
                <Text style={styles.titleInfo}>Name:</Text> {profile.name}
              </Text>

              <Text style={[styles.deliveryPhone, {color: appTheme.textColor}]}>
                <Text style={styles.titleInfo}>Phone:</Text> {profile.phone}
              </Text>

              <Text
                style={[styles.deliveryAddress, {color: appTheme.textColor}]}>
                <Text style={styles.titleInfo}>Address: </Text>
                112 Lý Chính Thắng, Quận 1, TP.HCM
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.itemsContainer, {backgroundColor: appTheme.flatlistbackgroundItem}]}>
          <IconLabel 
            icon="clipboard"
            label="Ordered List"
            conatainerStyle={styles.iconLabelContainer}
            labelStyle={styles.iconLabelStyle}
          />

          {productsOrdered.map((item, index) => (
            <View key={index} style={styles.itemsInfoContainer}>
              <Image source={{uri: item.image}} style={styles.imageItem}/>
              <View style={styles.itemInfo}>
                <Text style={[styles.itemName, {color: appTheme.textColor}]}>{item.name}</Text>
                <Text style={[styles.itemQuantity, {color: appTheme.textColor}]}>$100 x 1</Text>
              </View>
            </View>))}
        </View>

        <View style={[styles.paymentMethod, {backgroundColor: appTheme.flatlistbackgroundItem}]}>

          <IconLabel 
            icon="printer"
            label="Payment Method"
            conatainerStyle={styles.iconLabelContainer}
            labelStyle={styles.iconLabelStyle}
          />

          <Text style={[styles.paymentContent, {color: appTheme?.textColor}]}>Payment with credit card</Text>
        </View>

        <View style={[styles.totalOrderContainer, {backgroundColor: appTheme.flatlistbackgroundItem}]}>
          <View style={styles.totalItem}>
            <Text style={[styles.totalText, {color: appTheme.textColor}]}>Subtotal:</Text>
            <Text style={[styles.subTotalPrice, {color: appTheme.textColor}]}>$1000</Text>
          </View>

          <View style={styles.totalItem}>
            <Text style={[styles.totalText, {color: appTheme.textColor}]}>Delivery Cost:</Text>
            <Text style={[styles.subTotalPrice, {color: appTheme.textColor}]}>$100</Text>
          </View>

          <View style={styles.totalItem}>
            <Text style={[styles.totalText, {color: appTheme.textColor}]}>total:</Text>
            <Text style={[styles.subTotalPrice, {color: appTheme.textColor}]}>$900</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.buttonStyle, {marginRight: SIZES.padding}]}>
            <Text style={styles.buttonText}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonStyle, {backgroundColor: COLORS.primary}]}>
            <Text style={[styles.buttonText, {color: COLORS.white}]}>Re-Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    marginTop: SIZES.size_10,
    alignItems: 'center',
  },
  orderDetailTitle: {
    fontSize: SIZES.size_25,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
    color: COLORS.white
  },
  contentContainer: {
    flex: 1,
    marginTop: -SIZES.size_40,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    paddingHorizontal: SIZES.size_10,
  },
  orderContainer: {
    paddingTop: SIZES.size_10,
    paddingBottom: SIZES.size_50,
  },
  titleInfo: {
    fontSize: SIZES.size_18,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  mapContainer: {
    marginVertical: SIZES.size_5,
    marginLeft: SIZES.size_10,
  },
  mapStyle: {
    width: SIZES.size_120,
    height: SIZES.size_70,
    borderRadius: SIZES.size_10,
  },
  orderInfo: {
    marginTop: SIZES.size_10,
  },
  orderId: {
    fontSize: SIZES.size_16,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  orderDate: {
    fontSize: SIZES.size_15,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
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
    fontSize: SIZES.size_18,
    fontWeight: '500',
    marginLeft: SIZES.size_5,
    color: COLORS.primary,
  },
  trackContainer: {
    marginTop: SIZES.size_15,
    borderRadius: SIZES.radius,
  },
  iconLabelContainer: {
    marginTop: SIZES.size_5,
    marginLeft: SIZES.size_10,
  },
  iconLabelStyle: {
    marginLeft: SIZES.size_10,
  },
  delivery: {
    marginTop: SIZES.size_15,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.size_10,
  },
  deliveryInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  deliveredInfo: {
    marginLeft: SIZES.size_10,
  },
  deliveryName: {
    fontSize: SIZES.size_16,
    fontFamily: 'Roboto Mono',
  },
  deliveryPhone: {
    fontSize: SIZES.size_16,
    fontFamily: 'Roboto Mono',
  },
  deliveryAddress: {
    fontSize: SIZES.size_16,
    width: SIZES.size_230,
    fontFamily: 'Roboto Mono',
  },
  itemsContainer: {
    marginTop: SIZES.size_15,
    borderRadius: SIZES.radius,
  },
  paymentMethod: {
    flexDirection: 'column',
    marginTop: SIZES.size_15,
    borderRadius: SIZES.radius,
  },
  paymentContent: {
    fontSize: SIZES.size_16,
    marginVertical: SIZES.size_5,
    marginLeft: SIZES.size_10,
    opacity: 0.7,
    fontFamily: 'Roboto Mono',
  },
  totalOrderContainer: {
    marginTop: SIZES.size_15,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.size_10,
    paddingVertical: 5,
  },
  totalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: SIZES.size_18,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  subTotalPrice: {
    fontSize: SIZES.size_16,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.size_15,
  },
  buttonStyle: {
    paddingHorizontal: SIZES.size_40,
    height: SIZES.size_50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.silver,
  },
  buttonText: {
    fontSize: SIZES.size_20,
    fontWeight: '500',
  },
  itemsInfoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  imageItem: {
    width: SIZES.size_110,
    height: SIZES.size_70,
  },
  itemInfo: {
    marginLeft: SIZES.padding,
    width: '70%'
  },
  itemName: {
    fontSize: SIZES.size_16,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  itemQuantity: {
    fontSize: SIZES.size_16,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
});

export default OrderDetailComponent;
