import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated, Image, StyleSheet,
  Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ModalDropdown from 'react-native-modal-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { COLORS, SIZES } from '../../../constants';
import { appThemeSelector } from '../../../redux/selectors/themeSelector';
import CustomPopup from '../popups/CustomPopup';
import ICONS from '../../../constants/icons/index';

const CartItemCard = (props) => {
  const {
    item,
    index,
    swiperIcon,
    containerStyle,
    handlerDecrementQuantity,
    handlerIncrementQuantity,
    handlerRemoveProductFromCart,
    showPopup,
    setShowPopup
  } = props;

  const swipeableRef = useRef(null);

  const appTheme = useSelector(appThemeSelector);

  const navigation = useNavigation();

  const [reload, setReload] = useState(null);

  const handlerShowPopup = () => {
    setShowPopup(true);
    swipeableRef?.current.close();
  };

  const rightSwiper = (progress, dragY) => {
    const scale = dragY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity style={styles.rightSwiperContainer} onPress={handlerShowPopup}>
        <Animated.View style={{transform: [{scale}]}}>
          <Image source={swiperIcon} style={styles.binIcon}/>
        </Animated.View>
      </TouchableOpacity>
    );
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
      <Animatable.View key={reload} animation="fadeInLeft" duration={SIZES.duration + index * 300}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('ProducDetailScreen', {item})}>
          <View style={[styles.productItemContainer, containerStyle, {backgroundColor: appTheme.flatlistbackgroundItem, shadowColor: appTheme.shadowColor}]}>
            <View style={styles.leftItemContainer}>
              <Text style={[styles.productName, {color: appTheme.textColor}]}>{item.name}</Text>

              <Text style={styles.productPrice}>${item.price}</Text>

              <View style={styles.productInfo}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.ascQuantity}
                    onPress={() => handlerDecrementQuantity(item, handlerShowPopup)}>
                    <Feather name="minus" size={20} color={COLORS.white} />
                  </TouchableOpacity>

                  <Text style={[styles.quantityText, {color: appTheme.textColor}]}>{item.quantity}</Text>

                  <TouchableOpacity
                    style={styles.descQuantity}
                    onPress={() => handlerIncrementQuantity(item)}>
                    <Feather name="plus" size={20} color={COLORS.white} />
                  </TouchableOpacity>
                </View>

                <View style={styles.seperate} />

                <View style={styles.sizeContainer}>
                  <View style={styles.sizeTextContainer}>
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
              </View>
            </View>
            <View style={styles.rightItemContainer}>
              <Image source={{uri: item.image}} style={[styles.imageProduct, {shadowColor: appTheme.shadowImage}]}/>
            </View>
          </View>
        </TouchableWithoutFeedback>

        <CustomPopup 
          isVisible={showPopup}
          icon={ICONS.confirm}
          iconStyle={{tintColor: COLORS.white}}
          title="Confirm"
          content="Do you want to remove this item ?"
          leftButton="Cancel"
          rightButton="Ok"
          onPressLeftButton={() => setShowPopup(false)}
          onPressRightButton={() => handlerRemoveProductFromCart(item)}
        />
      </Animatable.View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  productItemContainer: {
    borderRadius: SIZES.radius * 2,
    paddingHorizontal: SIZES.size_10,
    paddingVertical: SIZES.size_5,
    flexDirection: 'row',
  },
  leftItemContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rightItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.size_10,
  },
  productName: {
    fontSize: SIZES.size_18,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
    marginBottom: SIZES.size_5,
  },
  productPrice: {
    fontFamily: 'Roboto Mono',
    fontSize: SIZES.size_20, textAlign: 'center',
    fontWeight: 'bold'
  },
  productInfo: {
    flexDirection: 'row',
    marginTop: SIZES.size_10,
    alignItems: 'center',
    marginLeft: SIZES.size_10
  },
  quantityContainer: {
    flexDirection: 'row',
  },
  quantityText: {
    fontSize: SIZES.size_25,
    fontWeight: '500',
    paddingHorizontal: SIZES.size_10,
  },
  ascQuantity: {
    width: SIZES.size_30,
    height: SIZES.size_30,
    borderRadius: SIZES.size_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  descQuantity: {
    width: SIZES.size_30,
    height: SIZES.size_30,
    borderRadius: SIZES.size_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  seperate: {
    borderLeftWidth: 2,
    borderLeftColor: 'black',
    height: SIZES.size_20,
    marginHorizontal: SIZES.size_20,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.size_30,
  },
  sizeStyle: {
    backgroundColor: 'transparent',
  },
  sizeTextContainer: {
    height: SIZES.size_30,
    width: SIZES.size_30,
    borderRadius: SIZES.size_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary
  },
  sizeText: {
    fontSize: SIZES.size_16,
    fontWeight: '500',
  },
  sizeDropdown: {
    backgroundColor: COLORS.primary,
  },
  sizeTextDropdown: {
    fontSize: SIZES.size_18,
  },
  imageProduct: {
    width: SIZES.size_150,
    height: SIZES.size_130,
  },
  rightSwiperContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dc143c',
    width: SIZES.size_90,
    borderRadius: SIZES.radius * 2,
  },
  binIcon: {
    width: SIZES.size_50,
    height: SIZES.size_50,
    tintColor: COLORS.white
  }
});

export default CartItemCard;
