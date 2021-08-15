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
import {setProductsFavoriteToStorage} from '../../utils/storage';
import ProductFavorite from './ProductFavorite';

const FavoriteScreen = ({navigation}) => {
  // get app theme
  const appTheme = useSelector(getAppThemeSelector);

  // use dispatch
  const dispatch = useDispatch();

  // get access token from redux
  const accessToken = useSelector(getAccessTokenSelector);

  // get products favorite from redux
  const productsFavorite = useSelector(getProductsFavoriteSelector);

  // save products favorite to storage
  const saveProductsFavoriteToStorage = async data => {
    return await setProductsFavoriteToStorage(data);
  };

  // save list favorite to redux and storage
  const saveFavoriteToReduxAndStorage = token => {
    getProductsFavoriteFromAPI(token)
      .then(res => {
        const response = res.data.content.productsFavorite;
        dispatch(hanlderSetProductFavorite(response));
        saveProductsFavoriteToStorage(JSON.stringify(response));
      })
      .catch(err => console.log(err));
  };

  // handler when click remove product in list favorite
  const handlerRemoveProduct = productId => {
    unLikeProductAPI(productId, accessToken)
      .then(res => {
        saveFavoriteToReduxAndStorage(accessToken);
      })
      .catch(err => console.log(err));
  };

  // render list product favorite
  const renderListFavorite = ({item, index}) => (
    <ProductFavorite
      handlerRemoveProduct={handlerRemoveProduct}
      item={item}
      index={index}
    />
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
        {typeof productsFavorite == 'object' &&
        productsFavorite.length !== 0 ? (
          <FlatList
            data={productsFavorite}
            keyExtractor={item => item.id}
            renderItem={renderListFavorite}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
            contentContainerStyle={styles.contentContainerStyle}
            snapToInterval={110}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Image
              source={require('../../assets/images/empty-folder.png')}
              style={styles.emptyIcon}
            />
            <Text style={[styles.emptyText, {color: appTheme.textColor}]}>
              Opps... You have no favorite product
            </Text>
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
    paddingTop: 10,
    paddingBottom: 150,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyIcon: {
    width: 300,
    height: 300,
  },
  emptyText: {
    fontSize: 30,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default FavoriteScreen;
