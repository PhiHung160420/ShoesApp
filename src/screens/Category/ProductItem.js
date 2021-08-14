import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {SIZES, COLORS} from '../../constants';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const ITEM_SIZE = 150;

const ProductItem = ({item, index, scrollY}) => {
  // get appTheme from store
  const appTheme = useSelector(getAppThemeSelector);

  // use navigation
  const navigation = useNavigation();

  const scaleInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];

  const scaleOutputRange = [1, 1, 1, 0];

  const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)];

  const opacityOutputRange = [1, 1, 1, 0];

  const scale = scrollY.interpolate({
    inputRange: scaleInputRange,
    outputRange: scaleOutputRange,
  });

  const opacity = scrollY.interpolate({
    inputRange: opacityInputRange,
    outputRange: opacityOutputRange,
  });

  return (
    <Animated.View
      style={[
        styles.ItemContainer,
        {
          backgroundColor:
            appTheme.name == 'dark' ? COLORS.gray3 : COLORS.gainsboro,
          shadowColor: appTheme.shadowColor,
          transform: [{scale}],
          opacity,
        },
      ]}>
      {/* LEFT CONTENT */}
      <View style={styles.leftContent}>
        <Text style={[styles.productName, {color: appTheme.textColor}]}>
          {item.name}
        </Text>
        <View style={styles.productPrice}>
          <MatIcon name="attach-money" size={22} color={appTheme.textColor} />
          <Text style={[styles.productPriceText, {color: appTheme.textColor}]}>
            {item.price}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.viewBtnContainer}
          onPress={() =>
            navigation.navigate('ProducDetailScreen', {productId: item.id})
          }>
          <Text style={[styles.viewBtnContent, {color: appTheme.textColor}]}>
            View
          </Text>
        </TouchableOpacity>
      </View>
      {/* LEFT CONTENT */}

      {/* RIGHT CONTENT */}
      <View style={styles.rightContent}>
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
      {/* RIGHT CONTENT */}
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
    width: SIZES.width - 30,
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
  },
  rightContent: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imageProduct: {
    width: 180,
    height: 140,
    shadowOffset: {
      height: 3,
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export default ProductItem;
