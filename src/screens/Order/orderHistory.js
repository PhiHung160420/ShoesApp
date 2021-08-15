import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {COLORS, SIZES} from '../../constants';
import {getProfileSelector} from '../../redux/selectors/profileSelector';
import ListOrder from './listOrder';
import {getOrderHistorySelector} from '../../redux/selectors/orderSelector';
import {actFetchOrderHistoryRequest} from '../../redux/actions/orderAction';
import {getAccessTokenSelector} from '../../redux/selectors/authSelector';
import * as Animatable from 'react-native-animatable';

const iconName = 'arrow-back-outline';

const OrderHistoryScreen = ({navigation}) => {
  // get app theme from redux
  const appTheme = useSelector(getAppThemeSelector);

  // get token from redux
  const token = useSelector(getAccessTokenSelector);

  // get ordersHistory from redux
  const ordersHistory = useSelector(getOrderHistorySelector);

  // render list order history
  const renderListOrder = ({item, index}) => {
    return <ListOrder order={item} index={index} />;
  };

  return (
    <View style={styles.container}>
      <HeaderBar nameIcon={iconName}>
        <View style={styles.titleContainer}>
          <Text style={[styles.orderHistoryTitle, {color: appTheme.textColor}]}>
            ORDER HISTORY
          </Text>
        </View>
      </HeaderBar>

      <View
        style={[
          styles.contentContainer,
          {backgroundColor: appTheme.backgroundColor},
        ]}>
        {ordersHistory.length !== 0 ? (
          <FlatList
            data={ordersHistory}
            keyExtractor={item => item.id}
            renderItem={renderListOrder}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.orderHistoryContainer}
            ItemSeparatorComponent={() => <View style={{height: 15}} />}
          />
        ) : (
          <View style={styles.emptyOrderContainer}>
            <Image
              source={require('../../assets/images/free-shipping.png')}
              style={styles.emptyOrderIcon}
            />
            <Text style={[styles.emptyOrderText, {color: appTheme.textColor}]}>
              No order history yet!
            </Text>
            <TouchableOpacity
              style={styles.shoppingButton}
              onPress={() => navigation.push('HomeScreen')}>
              <Text style={styles.shoppingButtonText}>Shopping Now</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  orderHistoryTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  orderHistoryContainer: {
    paddingTop: 20,
    paddingBottom: 50,
  },
  contentContainer: {
    flex: 1,
    marginTop: -20,
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
});

export default OrderHistoryScreen;
