import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import Feather from 'react-native-vector-icons/Feather';
import ModalDropdown from 'react-native-modal-dropdown';
import ProductPrice from '../../components/ProductPrice';
import {COLORS} from '../../constants/colors.constants';
import {SIZES} from '../../constants/sizes.constants';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../../redux/actions/cartAction';
import AlertConfirmRemove from '../../components/AlertConfirmRemove';
import {useNavigation} from '@react-navigation/native';
import {removeCartsInStorage} from '../../utils/storage';
import {getLoadingSelector} from '../../redux/selectors/loadingSelector';
import * as Animatable from 'react-native-animatable';

const ProductItem = ({item, index}) => {
  // get app theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // state show hide alert
  const [showAlert, setShowAlert] = useState(false);

  // state reload
  const [reload, setReload] = useState(null);

  // use ref
  const swipeableRef = useRef(null);

  // use dispatch
  const dispatch = useDispatch();

  // use navigation
  const navigation = useNavigation();

  // show alert
  const handlerShowAlert = () => {
    setShowAlert(true);
    swipeableRef.current.close();
  };

  // hide alert
  const handlerHideAlert = () => {
    setShowAlert(false);
  };

  // right swiper
  const rightSwiper = (progress, dragY) => {
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

  // handler increment quantity
  const handlerIncrementQuantity = item => {
    dispatch(incrementQuantity(item));
  };

  // handler decrement quantity
  const handlerDecrementQuantity = item => {
    if (item.quantity > 1) {
      dispatch(decrementQuantity(item));
    } else {
      handlerShowAlert();
    }
  };

  const handlerRemoveProductFromCart = async item => {
    dispatch(removeFromCart(item));
    await removeCartsInStorage();
  };

  useEffect(() => {
    navigation.addListener('focus', e => {
      if (e) {
        setReload(Math.random());
      }
    });
  }, []);

  return (
    <Swipeable ref={swipeableRef} renderLeftActions={rightSwiper}>
      <Animatable.View
        key={reload}
        animation="fadeInLeft"
        duration={SIZES.duration + index * 300}>
        <TouchableOpacity
          style={[
            styles.productItemContainer,
            {
              backgroundColor: appTheme.flatlistbackgroundItem,
              shadowColor: appTheme.shadowColor,
            },
          ]}
          onPress={() => navigation.navigate('ProducDetailScreen', {item})}>
          {/* ALERT CONFIRM REMOVE PRODUCT */}
          <AlertConfirmRemove
            item={item}
            showAlert={showAlert}
            handlerHideAlert={handlerHideAlert}
            handlerRemoveItem={handlerRemoveProductFromCart}
            message={'Are you sure want to remove this shoes ?'}
          />
          {/* ALERT CONFIRM REMOVE PRODUCT */}

          <View style={styles.leftItemContainer}>
            {/* NAME */}
            <Text style={[styles.productName, {color: appTheme.textColor}]}>
              {item.name}
            </Text>
            {/* NAME */}

            {/* PRICE */}
            <ProductPrice style={styles.productPrice}>
              {item.price}
            </ProductPrice>
            {/* PRICE */}

            {/* QUANTITY - SIZE */}
            <View style={styles.productInfo}>
              {/* QUANTITY */}
              <View style={styles.quantityContainer}>
                {/* DESC BUTTON */}
                <TouchableOpacity
                  style={styles.ascQuantity}
                  onPress={() => handlerDecrementQuantity(item)}>
                  <Feather name="minus" size={20} color="black" />
                </TouchableOpacity>
                {/* DESC BUTTON */}

                {/* QUANTITY */}
                <Text
                  style={[styles.quantityText, {color: appTheme.textColor}]}>
                  {item.quantity}
                </Text>
                {/* QUANTITY */}

                {/* ASC BUTTON */}
                <TouchableOpacity
                  style={styles.descQuantity}
                  onPress={() => handlerIncrementQuantity(item)}>
                  <Feather name="plus" size={20} color="white" />
                </TouchableOpacity>
                {/* ASC BUTTON */}
              </View>
              {/* QUANTITY */}

              <View style={styles.seperateContainer}>
                <View style={styles.seperate} />
              </View>

              {/* SIZE */}
              <View style={styles.sizeContainer}>
                <View
                  style={[
                    styles.sizeTextContainer,
                    {
                      backgroundColor:
                        appTheme.name == 'dark'
                          ? COLORS.gainsboro
                          : COLORS.darkgray,
                    },
                  ]}>
                  <Text style={styles.sizeText}>42</Text>
                </View>
                <ModalDropdown
                  options={item.size}
                  defaultValue={'42'}
                  style={styles.sizeStyle}
                  dropdownStyle={styles.sizeDropdown}
                  dropdownTextStyle={styles.sizeTextDropdown}
                  showsVerticalScrollIndicator={false}>
                  <Feather name="chevron-down" size={25} />
                </ModalDropdown>
              </View>
              {/* SIZE */}
            </View>
            {/* QUANTITY - SIZE */}
          </View>
          {/* IMAGE */}
          <View style={styles.rightItemContainer}>
            <Image
              source={{uri: item.image}}
              style={[
                styles.imageProduct,
                {
                  shadowColor:
                    appTheme.name == 'dark' ? COLORS.gainsboro : COLORS.black,
                },
              ]}
            />
          </View>
          {/* IMAGE */}
        </TouchableOpacity>
      </Animatable.View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  productItemContainer: {
    borderRadius: SIZES.radius * 2,
    width: SIZES.width - 20,
    marginHorizontal: 5,
    marginVertical: 5,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: {
      height: 4,
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  leftItemContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  rightItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Roboto Mono',
  },
  productPrice: {
    fontFamily: 'Roboto Mono',
  },
  productInfo: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '500',
    paddingHorizontal: 15,
  },
  ascQuantity: {
    width: 25,
    height: 25,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.silver,
  },
  descQuantity: {
    width: 25,
    height: 25,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black,
  },
  seperateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  seperate: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: 'black',
  },
  sizeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  sizeStyle: {
    backgroundColor: 'transparent',
  },
  sizeTextContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 15,
  },
  sizeDropdown: {
    backgroundColor: COLORS.green,
  },
  sizeTextDropdown: {
    fontSize: 15,
  },
  imageProduct: {
    width: 150,
    height: 130,
    shadowOffset: {
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  rightSwiperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    backgroundColor: '#dc143c',
    width: 90,
    borderRadius: SIZES.radius * 2,
  },
});

export default ProductItem;
