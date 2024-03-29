import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Animated, Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { COLORS, SIZES } from '../../constants';
import { appThemeSelector } from '../../redux/selectors/themeSelector';

const ITEM_SIZE = 150;

const CategoryItem = ({item, index, scrollY, onPress}) => {
  const appTheme = useSelector(appThemeSelector);

  const navigation = useNavigation();

  const scaleInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];

  const outputRange = [1, 1, 1, 0];

  const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)];

  const scale = scrollY.interpolate({
    inputRange: scaleInputRange,
    outputRange,
  });

  const opacity = scrollY.interpolate({
    inputRange: opacityInputRange,
    outputRange,
  });

  return (
    <Animated.View
      style={[
        styles.ItemContainer,
        {
          backgroundColor: appTheme.flatlistbackgroundItem,
          shadowColor: appTheme.shadowColor,
          transform: [{ scale }],
          opacity,
        },
      ]}>
      <View style={styles.leftContent}>
        <Text style={[styles.productName, {color: appTheme.textColor}]}>{item.name}</Text>
        <View style={styles.productPrice}>
          <MatIcon name="attach-money" size={22} color={appTheme.textColor} />
          <Text style={[styles.productPriceText, {color: appTheme.textColor}]}>{item.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.viewBtnContainer}
          onPress={onPress}>
          <Text style={[styles.viewBtnContent, {color: appTheme.textColor}]}>View</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rightContent}>
        <Image
          source={{uri: item.image}}
          style={[
            styles.imageProduct,
            {
              shadowColor: appTheme.shadowImage,
            },
          ]}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  ItemContainer: {
    borderRadius: SIZES.radius,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 130,
    width: SIZES.deviceWidth - 30,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 1,
  },
  leftContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto Mono',
  },
  productPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  productPriceText: {
    fontWeight: 'bold',
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewBtnContainer: {
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: SIZES.radius,
    marginTop: 5,
  },
  viewBtnContent: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
  rightContent: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imageProduct: {
    width: 170,
    height: 140,
    shadowOffset: {
      height: 3,
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export default CategoryItem;
