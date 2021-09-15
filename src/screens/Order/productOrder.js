import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {SIZES} from '../../constants/sizes.constants';

const ProductOrder = ({item, appTheme}) => {
  return (
    <View style={styles.itemsInfoContainer}>
      <Image
        source={{
          uri: item.image,
        }}
        style={styles.imageItem}
      />
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, {color: appTheme.textColor}]}>
          {item.name}
        </Text>
        <Text style={[styles.itemQuantity, {color: appTheme.textColor}]}>
          $100 x 1
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemsInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
  },
  imageItem: {
    width: 110,
    height: 70,
  },
  itemInfo: {
    flexDirection: 'column',
    marginLeft: 10,
    width: SIZES.width / 2 + 60,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto Mono',
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Roboto Mono',
  },
});

export default ProductOrder;
