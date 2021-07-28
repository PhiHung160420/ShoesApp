import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {
  removeAccessTokenInStorage,
  setProductsFavoriteToStorage,
} from '../../utils/storage';
import {COLORS, icons, SIZES} from '../../constants/index';
import HeaderBar from '../../components/HeaderBar';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {getProductsFavoriteSelector} from '../../redux/selectors/productSelector';
import {getAllCategoriesAPI} from '../../services/categoriesAPI';
import {
  getAllProduct,
  getProductsFavoriteFromAPI,
} from '../../services/productAPI';
import ProductItem from './productItem';
import {getAccessTokenSelector} from '../../redux/selectors/authSelector';

const HomeScreen = ({navigation}) => {
  // dispatch
  const dispatch = useDispatch();

  // get access token from store
  const accessToken = useSelector(getAccessTokenSelector);

  // get theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // state list categories
  const [listCate, setListCate] = useState([]);

  // get products favorite from redux
  const productsFavorite = useSelector(getProductsFavoriteSelector);

  // state list product favorite
  const [listFavorite, setListFavorite] = useState([]);

  // state list products
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    // get list categories
    getAllCategoriesAPI()
      .then(res => setListCate(res.data.content))
      .catch(err => console.log(err));
    // get list products
    getAllProduct()
      .then(res => setListProducts(res.data.content))
      .catch(err => console.log(err));
  }, []);

  // get new products favorite then click like or unlike
  useEffect(() => {
    getProductsFavoriteFromAPI(accessToken)
      .then(res => {
        setListFavorite(res.data.content.productsFavorite);
      })
      .catch(err => console.log(err));
  }, [productsFavorite]);

  // render items
  const renderListProduct = ({item}) => {
    var isLiked = null;
    if (listFavorite.length !== 0) {
      listFavorite.forEach(product => {
        if (product.id == item.id) {
          isLiked = true;
        }
      });
    }
    return <ProductItem product={item} appTheme={appTheme} isLiked={isLiked} />;
  };

  const renderListCategories = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles(appTheme).cateItemContainer,
          {width: item.id == 'VANS_CONVERSE' ? 200 : 100},
        ]}
        onPress={() => navigation.navigate('CategoryScreen', {id: item.id})}>
        <Text style={styles(appTheme).cateItemName}>{item.category}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles(appTheme).container}>
      {/* HEADER */}
      <HeaderBar>
        <View style={styles(appTheme).searchContainer}>
          <View style={styles(appTheme).searchStyle}>
            <TextInput
              style={styles(appTheme).searchInput}
              placeholder="Find shoes"
              placeholderTextColor={COLORS.gray}
            />
            <TouchableOpacity style={styles(appTheme).searchButton}>
              <Feather
                name="search"
                size={25}
                color={appTheme.name == 'dark' ? 'black' : 'white'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </HeaderBar>
      {/* HEADER */}

      {/* CONTENT */}
      <View style={styles(appTheme).contentContainer}>
        {/* CATEGORY */}
        <View style={styles(appTheme).categoryContainer}>
          <Text style={styles(appTheme).categoryTitle}>Categories</Text>

          <FlatList
            horizontal={true}
            data={listCate}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles(appTheme).cateListItem}
            snapToInterval={120}
            ItemSeparatorComponent={() => <View style={{width: 10}}></View>}
            renderItem={renderListCategories}
          />
        </View>
        {/* CATEGORY */}

        {/* LIST PRODUCT */}
        <View style={styles(appTheme).listProductContainer}>
          <FlatList
            data={listProducts}
            keyExtractor={item => item.id}
            renderItem={renderListProduct}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={styles(appTheme).listProductStyle}
          />
        </View>
        {/* LIST PRODUCT */}
      </View>
      {/* CONTENT */}
    </View>
  );
};

const styles = appTheme =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'column',
      marginTop: -20,
      borderTopLeftRadius: SIZES.radius * 2,
      borderTopRightRadius: SIZES.radius * 2,
      backgroundColor: appTheme.backgroundColor,
    },
    categoryContainer: {
      flex: 2,
      flexDirection: 'column',
      marginLeft: 15,
      marginTop: 10,
    },
    listProductContainer: {
      flex: 10,
      paddingHorizontal: 10,
    },
    categoryTitle: {
      color: appTheme.textColor,
      fontSize: 25,
      fontWeight: 'bold',
    },
    cateListItem: {
      marginTop: 10,
      paddingRight: 20,
    },
    cateItemContainer: {
      backgroundColor:
        appTheme.name == 'dark' ? COLORS.gray3 : COLORS.gainsboro,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginLeft: 10,
      shadowOffset: {
        height: 5,
        width: 5,
      },
      shadowColor: appTheme.name == 'dark' ? COLORS.lightGray1 : COLORS.gray3,
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 1,
    },
    cateItemName: {
      color: appTheme.textColor,
      fontWeight: 'bold',
      fontSize: 20,
    },
    listProductStyle: {
      paddingBottom: 100,
    },
    searchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    searchStyle: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: SIZES.width / 2 + 50,
      borderRadius: 20,
      height: 40,
      borderWidth: 1,
      borderColor: appTheme.name == 'dark' ? COLORS.gainsboro : COLORS.white,
      backgroundColor:
        appTheme.name == 'dark' ? COLORS.gainsboro : COLORS.white,
    },
    searchInput: {
      fontSize: 15,
      width: SIZES.width / 2,
      height: 40,
      paddingLeft: 15,
      color: COLORS.black,
    },
    searchButton: {
      width: 35,
      height: 35,
      borderRadius: 20,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 5,
    },
  });

export default HomeScreen;
