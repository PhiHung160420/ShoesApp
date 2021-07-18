import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {SIZES, COLORS} from '../../constants';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {getProductByCategory} from '../../services/categoriesAPI';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

const iconName = 'arrow-back-outline';

const CategoryScreen = ({route, navigation}) => {
  // get category id
  const {id} = route.params;

  // state list product
  const [listProduct, setListProduct] = useState([]);

  // get appTheme from store
  const appTheme = useSelector(getAppThemeSelector);

  // get product by category
  useEffect(() => {
    getProductByCategory(id)
      .then(res => setListProduct(res.data.content))
      .catch(err => console.log(err));
  }, []);

  // render list product
  const renderProduct = ({item}) => {
    return (
      <View
        style={[
          styles.ItemContainer,
          {
            backgroundColor:
              appTheme.name == 'dark' ? COLORS.gray3 : COLORS.gainsboro,
            shadowColor:
              appTheme.name == 'dark' ? COLORS.lightGray2 : COLORS.gray3,
          },
        ]}>
        {/* LEFT CONTENT */}
        <View style={styles.leftContent}>
          <Text style={[styles.productName, {color: appTheme.textColor}]}>
            {item.name}
          </Text>
          <View style={styles.productPrice}>
            <MatIcon name="attach-money" size={22} color={appTheme.textColor} />
            <Text
              style={[styles.productPriceText, {color: appTheme.textColor}]}>
              {item.price}
            </Text>
          </View>
          <TouchableOpacity style={styles.viewBtnContainer}>
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
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER BAR */}
      <HeaderBar nameIcon={iconName}>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleStyle, {color: appTheme.textColor}]}>
            {id}
          </Text>
        </View>
      </HeaderBar>
      {/* HEADER BAR */}

      {/* LIST PRODUCT */}
      <View
        style={[
          styles.contentContainer,
          {backgroundColor: appTheme.backgroundColor},
        ]}>
        <FlatList
          data={listProduct}
          keyExtractor={item => item.id}
          renderItem={renderProduct}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listProductContainer}
          snapToInterval={175}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
        />
      </View>
      {/* LIST PRODUCT */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: SIZES.radius * 3,
    borderTopRightRadius: SIZES.radius * 3,
    marginTop: -30,
    paddingVertical: 8,
  },
  listProductContainer: {
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  ItemContainer: {
    borderRadius: SIZES.radius,
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
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

export default CategoryScreen;
