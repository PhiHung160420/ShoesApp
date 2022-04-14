import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useRef } from 'react';
import {
  Animated, Image, StyleSheet, Text,
  TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { COLORS, IMAGES, SIZES } from '../../../constants';
import { appThemeSelector } from '../../../redux/selectors/themeSelector';
import { CustomPopup } from '../../common';

const OrderCard = (props) => {
  const {
    order, 
    index,
    showAlert,
    setShowAlert,
    handlerRemoveOrderHistory,
    containerStyle
  } = props;

  const appTheme = useSelector(appThemeSelector);

  const navigation = useNavigation();

  const swipeableRef = useRef(null);

  const handlerShowAlert = () => {
    setShowAlert(true);
    swipeableRef?.current.close();
  };

  const RightSwiper = (progress, dragY) => {
    const scale = dragY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity style={styles.rightSwiperContainer} onPress={handlerShowAlert}>
        <Animated.View style={{transform: [{scale}]}}>
          <Feather name="trash-2" size={50} color={COLORS.white} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable ref={swipeableRef} renderLeftActions={RightSwiper}>
      <Animatable.View animation="fadeInLeft" delay={SIZES.duration + index * 100}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('OrderDetailScreen', {orderId: order.id})}>
          <View style={[styles.itemContainer, containerStyle, {backgroundColor: appTheme.flatlistbackgroundItem}]}>
            <CustomPopup
              isVisible={showAlert}
              title="Confirm"
              content="Are you sure want to remove this order ?"
              leftButton="No"
              rightButton="Yes"
              onPressLeftButton={() => setShowAlert(false)}
              onPressRightButton={handlerRemoveOrderHistory}
            />

            <Image source={IMAGES.order} style={styles.iconOrder}/>

            <View style={styles.infoOrder}>
              <Text style={[styles.dateStyle, {color: appTheme.textColor}]}>
                Date: {moment(order.date).format('DD/MM/YYYY')}
              </Text>

              <Text style={[styles.orderIdStyle, {color: appTheme.textColor}]}>
                ID: #{order.id}
              </Text>
            </View>

            <View style={[styles.separate, {borderRightColor: appTheme.textColor}]} />

            <Text style={[styles.totalItem, {color: appTheme.textColor}]}>{order.orderDetail.length} item</Text>
            
            <TouchableOpacity>
              <AntDesign name="arrowright" size={SIZES.size_25} color={appTheme.textColor} />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Animatable.View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: SIZES.deviceWidth - SIZES.padding,
    height: SIZES.size_100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.radius * 2,
    paddingHorizontal: SIZES.size_5,
  },
  iconOrder: {
    width: SIZES.size_65,
    height: SIZES.size_65,
  },
  infoOrder: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dateStyle: {
    fontSize: SIZES.size_16,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  orderIdStyle: {
    fontSize: SIZES.size_16,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  separate: {
    height: SIZES.size_40,
    borderRightWidth: 0.5,
  },
  totalItem: {
    fontSize: SIZES.size_18,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  rightSwiperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.size_100,
    backgroundColor: '#dc143c',
    width: SIZES.size_100,
    borderTopLeftRadius: SIZES.radius * 2,
    borderBottomLeftRadius: SIZES.radius * 2,
    marginRight: -SIZES.size_20,
  },
});

export default OrderCard;
