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
import {COLORS} from '../../constants/colors.constants';
import {SIZES} from '../../constants/sizes.constants';
import {ICONS} from '../../constants/icons.constants';
import HeaderBar from '../../components/HeaderBar';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {
  getAllProductsSelector,
  getProductsFavoriteSelector,
} from '../../redux/selectors/productSelector';
import {getAllProduct} from '../../services/productAPI';
import ProductItem from './productItem';
import LoadingScreen from '../Loading/index';
import {getAccessTokenSelector} from '../../redux/selectors/authSelector';
import {actFetchGetAllCategoryRequest} from '../../redux/actions/categoryAction';
import {actFetchGetAllProductRequest} from '../../redux/actions/productAction';
import {getAllCategorySelector} from '../../redux/selectors/categorySelector';
import {getLoadingSelector} from '../../redux/selectors/loadingSelector';
import {handlerSetLoading} from '../../redux/actions/loadingAction';
import {handlerSignOut} from '../../redux/actions/authAction';
import {getSessionSelector} from '../../redux/selectors/profileSelector';
import {removeAccessTokenInStorage} from '../../utils/storage';
import PopupSession from '../../components/popupSession';

const HomeScreen = ({navigation}) => {
  // dispatch
  const dispatch = useDispatch();

  // get access token from store
  const accessToken = useSelector(getAccessTokenSelector);

  // get theme from store
  const appTheme = useSelector(getAppThemeSelector);

  // get token session from store
  const session = useSelector(getSessionSelector);

  // get loading from redux
  const isLoading = useSelector(getLoadingSelector);

  // get products favorite from redux
  const productsFavorite = useSelector(getProductsFavoriteSelector);

  // get list category from redux
  const listCate = useSelector(getAllCategorySelector);

  // get list product from redux
  const listProducts = useSelector(getAllProductsSelector);

  // state show hide popup
  const [showHidePopup, setShowHidePopup] = useState(false);

  //handler show hide popup
  const handlerShowHidePopup = () => {
    setShowHidePopup(!showHidePopup);
  };

  useEffect(() => {
    // get all category
    dispatch(actFetchGetAllCategoryRequest());
    // get all product
    dispatch(actFetchGetAllProductRequest());
  }, []);

  useEffect(() => {
    const loading = setTimeout(() => {
      dispatch(handlerSetLoading(false));
    }, 4000);

    const handlerSession = setTimeout(() => {
      if (session == false) {
        handlerShowHidePopup();
      }
    }, 4500);

    return () => {
      clearTimeout(loading);
      clearTimeout(handlerSession);
    };
  }, [session]);

  // render items
  const renderListProduct = ({item, index}) => {
    var isLiked = false;

    if (typeof productsFavorite == 'object') {
      productsFavorite.forEach(product => {
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
          {width: item.id == 'VANS_CONVERSE' ? 200 : 110},
        ]}
        onPress={() => navigation.navigate('CategoryScreen', {id: item.id})}>
        <Text style={styles(appTheme).cateItemName}>{item.category}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles(appTheme).container}>
      {/* POPUP */}
      {showHidePopup && (
        <PopupSession
          showHidePopup={showHidePopup}
          handlerShowHidePopup={handlerShowHidePopup}
        />
      )}
      {/* POPUP */}
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

      {isLoading ? (
        <LoadingScreen />
      ) : (
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
              snapToInterval={125}
              ItemSeparatorComponent={() => <View style={{width: 5}}></View>}
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
      )}
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryTitle: {
      color: appTheme.textColor,
      fontSize: 25,
      fontWeight: 'bold',
      marginLeft: 10,
      fontFamily: 'Roboto Mono',
    },
    cateListItem: {
      marginTop: 10,
      paddingRight: 20,
      marginLeft: -10,
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
      fontFamily: 'Roboto Mono',
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
