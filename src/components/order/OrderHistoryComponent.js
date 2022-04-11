import React from 'react';
import {
  FlatList,
  Image, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, IMAGES, SIZES, ICONS } from '../../constants';
import { getAppThemeSelector } from '../../redux/selectors/themeSelector';
import { HeaderBar, OrderCard } from '../common';

const OrderHistoryComponent = (props) => {
  const {
    ordersHistory,
    handlerRemoveOrderHistory,
    showAlert,
    setShowAlert
  } = props;

  const appTheme = useSelector(getAppThemeSelector);

  return (
    <View style={styles.container}>
      <HeaderBar nameIcon={ICONS.arrow_back}>
        <Text style={styles.title}>ORDER HISTORY</Text>
      </HeaderBar>

      <View style={[styles.contentContainer, {backgroundColor: appTheme.backgroundColor}]}>
        {ordersHistory.length !== 0 ? 
          <FlatList
            data={ordersHistory}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.orderHistoryContainer}
            renderItem={({item, index}) => (
              <OrderCard 
                order={item}
                index={index}
                containerStyle={styles.listContainer}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                handlerRemoveOrderHistory={() => {
                  handlerRemoveOrderHistory(item);
                  setShowAlert(false);
                }}
              />
            )}
          /> :
          <View style={styles.emptyOrderContainer}>
            <Image source={IMAGES.free_shipping} style={styles.emptyOrderIcon}/>

            <Text style={[styles.emptyOrderText, {color: appTheme.textColor}]}>No order history yet!</Text>
            
            <TouchableOpacity style={styles.shoppingButton} onPress={() => navigation.push('HomeScreen')}>
              <Text style={styles.shoppingButtonText}>Shopping Now</Text>
            </TouchableOpacity>
          </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: SIZES.size_25,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
    marginTop: SIZES.padding
  },
  orderHistoryContainer: {
    paddingTop: SIZES.padding,
    paddingBottom: SIZES.size_30,
  },
  contentContainer: {
    flex: 1,
    marginTop: -SIZES.size_20,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyOrderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyOrderIcon: {
    height: 150,
    width: 150,
  },
  emptyOrderText: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: -10,
  },
  shoppingButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  shoppingButtonText: {
    fontSize: 18,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  listContainer: {
    marginBottom: SIZES.size_10
  }
});

export default OrderHistoryComponent;
