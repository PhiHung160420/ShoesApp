import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderBar from '../../components/HeaderBar';
import {COLORS, SIZES} from '../../constants';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {getProductsFavoriteSelector} from '../../redux/selectors/productSelector';
import {getAccessTokenSelector} from '../../redux/selectors/authSelector';
import {hanlderSetProductFavorite} from '../../redux/actions/productAction';
import {
  getProductsFavoriteFromAPI,
  unLikeProductAPI,
} from '../../services/productAPI';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setProductsFavoriteToStorage} from '../../utils/storage';

const FavoriteScreen = ({navigation}) => {
  // get app theme
  const appTheme = useSelector(getAppThemeSelector);

  // use dispatch
  const dispatch = useDispatch();

  // get access token from redux
  const accessToken = useSelector(getAccessTokenSelector);

  // get products favorite from redux
  const productsFavorite = useSelector(getProductsFavoriteSelector);

  // state list product
  const [listFavorite, setListFavorite] = useState([]);

  useEffect(() => {
    setListFavorite(productsFavorite);
  }, [productsFavorite]);

  // save products favorite to storage
  const saveProductsFavoriteToStorage = async data => {
    return await setProductsFavoriteToStorage(data);
  };

  // save list favorite to redux and storage
  const saveFavoriteToReduxAndStorage = token => {
    getProductsFavoriteFromAPI(token)
      .then(res => {
        dispatch(hanlderSetProductFavorite(res.data.content.productsFavorite));
        saveProductsFavoriteToStorage(
          JSON.stringify(res.data.content.productsFavorite),
        );
      })
      .catch(err => console.log(err));
  };

  const handlerRemoveProduct = productId => {
    unLikeProductAPI(productId, accessToken)
      .then(res => {
        saveFavoriteToReduxAndStorage(accessToken);
      })
      .catch(err => console.log(err));
  };

  const renderListFavorite = ({item}) => (
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
          <Ionicons name="heart-dislike-circle" size={50} color={COLORS.red} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderBar>
        <View style={styles.titleContainer}>
          <Text style={[styles.titleText, {color: appTheme.textColor}]}>
            My Favorite
          </Text>
        </View>
      </HeaderBar>
      <View
        style={[
          styles.contentContainer,
          {
            backgroundColor: appTheme.backgroundColor,
          },
        ]}>
        <FlatList
          data={listFavorite}
          keyExtractor={item => item.id}
          renderItem={renderListFavorite}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          contentContainerStyle={styles.contentContainerStyle}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 2,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    marginTop: -20,
  },
  contentContainerStyle: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 120,
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

export default FavoriteScreen;
