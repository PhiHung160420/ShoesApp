import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, SIZES} from '../../constants';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';
import {deleteOrderAPI} from '../../services/orderAPI';
import {getAccessTokenSelector} from '../../redux/selectors/authSelector';
import AlertConfirmRemove from '../../components/AlertConfirmRemove';
import {actFetchOrderHistoryRequest} from '../../redux/actions/orderAction';
import {useNavigation} from '@react-navigation/native';

const ListOrder = ({order}) => {
  // get app theme from redux
  const appTheme = useSelector(getAppThemeSelector);

  // get token from redux
  const token = useSelector(getAccessTokenSelector);

  // use navigation
  const navigation = useNavigation();

  // use dispatch
  const dispatch = useDispatch();

  // use ref
  const swipeableRef = useRef(null);

  // state show hide alert
  const [showAlert, setShowAlert] = useState(false);

  // show alert
  const handlerShowAlert = () => {
    setShowAlert(true);
    swipeableRef.current.close();
  };

  // hide alert
  const handlerHideAlert = () => {
    setShowAlert(false);
  };

  // remove order history
  const handlerRemoveOrderHistory = () => {
    let data = {};
    data.orderId = order.id;

    deleteOrderAPI(data, token)
      .then(res => {
        dispatch(actFetchOrderHistoryRequest(token));
      })
      .catch(err => console.log(err));
  };

  // right swiper
  const RightSwiper = (progress, dragY) => {
    const scale = dragY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        style={styles.rightSwiperContainer}
        onPress={handlerShowAlert}>
        <Animated.View style={{transform: [{scale}]}}>
          <Feather name="trash-2" size={50} color={appTheme.textColor} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable ref={swipeableRef} renderLeftActions={RightSwiper}>
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: appTheme.flatlistbackgroundItem,
          },
        ]}>
        {/* ALERT CONFIRM REMOVE PRODUCT */}
        <AlertConfirmRemove
          item={order}
          showAlert={showAlert}
          handlerHideAlert={handlerHideAlert}
          handlerRemoveItem={handlerRemoveOrderHistory}
          message={'Are you sure want to remove this order ?'}
        />
        {/* ALERT CONFIRM REMOVE PRODUCT */}

        <Image
          source={require('../../assets/images/order.png')}
          style={styles.iconOrder}
        />
        <View style={styles.infoOrder}>
          <Text style={[styles.dateStyle, {color: appTheme.textColor}]}>
            Date: {moment(order.date).format('DD/MM/YYYY')}
          </Text>
          <Text style={[styles.orderIdStyle, {color: appTheme.textColor}]}>
            Order ID: #{order.id}
          </Text>
        </View>
        <View
          style={[styles.separate, {borderRightColor: appTheme.textColor}]}
        />
        <Text style={[styles.totalItem, {color: appTheme.textColor}]}>
          {order.orderDetail.length} item
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OrderDetailScreen', {orderId: order.id})
          }>
          <AntDesign name="arrowright" size={35} color={appTheme.textColor} />
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: SIZES.width - 20,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.radius * 2,
    paddingHorizontal: 10,
  },
  iconOrder: {
    width: 65,
    height: 65,
  },
  infoOrder: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dateStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
  orderIdStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
  separate: {
    height: 40,
    borderRightWidth: 0.5,
  },
  totalItem: {
    fontSize: 18,
    fontWeight: '500',
  },
  rightSwiperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#dc143c',
    width: 100,
    borderTopLeftRadius: SIZES.radius * 2,
    borderBottomLeftRadius: SIZES.radius * 2,
    marginRight: -20,
  },
});

export default ListOrder;
