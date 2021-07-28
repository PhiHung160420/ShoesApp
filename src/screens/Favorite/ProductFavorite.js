import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';

const ProductFavorite = ({handlerRemoveProduct, item}) => {
  //get app theme from redux
  const appTheme = useSelector(getAppThemeSelector);

  // use navigation
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[
        styles.productContainer,
        {backgroundColor: appTheme.flatlistbackgroundItem},
      ]}
      onPress={() =>
        navigation.navigate('ProducDetailScreen', {productId: item.id})
      }>
      <View style={styles.leftContainer}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.productNameContainer}>
          <Text style={[styles.productname, {color: appTheme.textColor}]}>
            {item.name}
          </Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={() => handlerRemoveProduct(item.id)}>
          <Ionicons name="heart-dislike-sharp" size={40} color={COLORS.red} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    borderRadius: SIZES.radius * 2,
    marginHorizontal: 10,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 5,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  productImage: {
    height: 140,
    width: 140,
  },
  productNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    marginLeft: 5,
  },
  productname: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default ProductFavorite;
