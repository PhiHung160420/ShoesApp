import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {payments} from '../../constants/index';

const Method = ({item, appTheme, methodSelected, handerSelectedMethod}) => {
  return (
    <TouchableOpacity
      style={[
        styles.methodContainer,
        {
          backgroundColor: appTheme.viewBackground,
          borderWidth: methodSelected == item.id ? 4 : 0,
          borderColor: methodSelected == item.id && COLORS.lightGreen,
        },
      ]}
      onPress={() => handerSelectedMethod(item.id)}>
      {/* INFO CARD */}
      <View style={styles.methodInfo}>
        {/* CARD ICON */}
        <Image style={styles.methodImage} source={item.image} />
        {/* CARD ICON */}

        {/* CARD NAME */}
        <Text style={[styles.methodName, {color: appTheme.textColor}]}>
          {item.name}
        </Text>
        {/* CARD NAME */}
      </View>
      {/* INFO CARD */}

      {/* ICON CHECKED */}
      {methodSelected == item.id && (
        <View style={styles.checkedContainer}>
          <Feather name="check-circle" size={20} color={appTheme.textColor} />
        </View>
      )}
      {/* ICON CHECKED */}
    </TouchableOpacity>
  );
};

const PaymentMethod = ({appTheme}) => {
  // state method selected
  const [methodSelected, setMethodSelected] = useState(payments[0].id);

  // handler selected method
  const handerSelectedMethod = methodId => {
    setMethodSelected(methodId);
  };

  return (
    <View style={styles.paymentMethodContainer}>
      <View style={styles.paymentMethodBar}>
        <Text style={[styles.paymentMethodTitle, {color: appTheme.textColor}]}>
          PAYMENT METHOD
        </Text>
        <TouchableOpacity style={styles.addBtnContainer}>
          <Text style={styles.addBtnContent}>Add</Text>
          <AntDesign name="plus" size={15} />
        </TouchableOpacity>
      </View>

      {/* METHOD LIST */}
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        {payments.map((item, index) => (
          <Method
            item={item}
            key={index}
            appTheme={appTheme}
            methodSelected={methodSelected}
            handerSelectedMethod={handerSelectedMethod}
          />
        ))}
      </ScrollView>
      {/* METHOD LIST */}
    </View>
  );
};

const styles = StyleSheet.create({
  paymentMethodContainer: {
    flex: 2,
    marginTop: 15,
  },
  paymentMethodBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    alignItems: 'center',
  },
  paymentMethodTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  addBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: COLORS.green,
  },
  addBtnContent: {
    fontSize: 15,
  },
  methodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    height: 45,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  methodImage: {
    width: 40,
    height: 40,
  },
  cardNumber: {
    marginLeft: 10,
  },
  checkedContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.green,
  },
});

export default PaymentMethod;
