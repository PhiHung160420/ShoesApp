import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

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
  },
  imageItem: {
    width: 100,
    height: 70,
  },
  itemInfo: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
  },
  itemQuantity: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ProductOrder;
