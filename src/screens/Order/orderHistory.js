import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {COLORS, SIZES} from '../../constants';
import {getProfileSelector} from '../../redux/selectors/profileSelector';
import ListOrder from './listOrder';
import {getOrderHistorySelector} from '../../redux/selectors/orderSelector';
import {actFetchOrderHistoryRequest} from '../../redux/actions/orderAction';
import {getAccessTokenSelector} from '../../redux/selectors/authSelector';

const iconName = 'arrow-back-outline';

const OrderHistoryScreen = () => {
  // get app theme from redux
  const appTheme = useSelector(getAppThemeSelector);

  // get token from redux
  const token = useSelector(getAccessTokenSelector);

  // use dispatch
  const dispatch = useDispatch();

  // get ordersHistory from redux
  const ordersHistory = useSelector(getOrderHistorySelector);

  // call api get orders history and save to redux
  useEffect(() => {
    dispatch(actFetchOrderHistoryRequest(token));
  }, []);

  //console.log(ordersHistory);

  const renderListOrder = ({item}) => {
    return <ListOrder data={item} />;
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
        <FlatList
          data={ordersHistory}
          keyExtractor={item => item.id}
          renderItem={renderListOrder}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.orderHistoryContainer}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
        />
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
});

export default OrderHistoryScreen;
