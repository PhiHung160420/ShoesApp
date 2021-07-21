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
import ProductItem from './ProductItem';

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
    return <ProductItem item={item} />;
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
          snapToInterval={150}
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
    paddingTop: 10,
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
});

export default CategoryScreen;
