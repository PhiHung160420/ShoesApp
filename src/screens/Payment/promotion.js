import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS} from '../../constants/colors.constants';
import {SIZES} from '../../constants/sizes.constants';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';

const Promotion = () => {
  const appTheme = useSelector(getAppThemeSelector);

  return (
    <View style={styles.promoContainer}>
      <Text style={[styles.promoTitle, {color: appTheme.textColor}]}>
        Promotion
      </Text>
      <View
        style={[styles.promoStyle, {backgroundColor: appTheme.viewBackground}]}>
        <TextInput
          style={styles.promoInput}
          placeholder="Promo Code"
          placeholderTextColor={appTheme.textColor}
        />
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyBtnText}>apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  promoContainer: {
    height: 70,
    marginTop: 10,
    marginBottom: 20,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: '500',
    textTransform: 'uppercase',
    fontFamily: 'Roboto Mono',
  },
  promoStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    height: 50,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  promoInput: {
    height: 30,
    fontSize: 15,
    width: '40%',
    color: COLORS.black,
  },
  applyButton: {
    borderRadius: SIZES.radius,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
  },
  applyBtnText: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Roboto Mono',
  },
});

export default Promotion;
