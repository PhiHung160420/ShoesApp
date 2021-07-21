import React from 'react';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getAppThemeSelector} from '../redux/selectors/themeSelector';

const ProductPrice = ({children, colorText}) => {
  const appTheme = useSelector(getAppThemeSelector);

  return (
    <View style={styles.totalPrice}>
      <MatIcon
        name="attach-money"
        size={25}
        color={colorText ? colorText : appTheme.textColor}
      />
      <Text
        style={[
          styles.productPriceText,
          {color: colorText ? colorText : appTheme.textColor},
        ]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  totalPrice: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  productPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProductPrice;
