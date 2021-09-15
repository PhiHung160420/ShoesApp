import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import HeaderBar from '../../components/HeaderBar';
import {useDispatch, useSelector} from 'react-redux';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {getAccessTokenSelector} from '../../redux/selectors/authSelector';
import {
  getProductByIdSelector,
  getProductsFavoriteSelector,
} from '../../redux/selectors/productSelector';
import {COLORS} from '../../constants/colors.constants';
import {SIZES} from '../../constants/sizes.constants';
import {
  getProductById,
  getProductsFavoriteFromAPI,
  likeProductAPI,
  unLikeProductAPI,
} from '../../services/productAPI';
import {SharedElement} from 'react-navigation-shared-element';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  actFetchGetProductByIdRequest,
  hanlderSetProductFavorite,
} from '../../redux/actions/productAction';
import {setProductsFavoriteToStorage} from '../../utils/storage';
import {addProductToCart} from '../../redux/actions/cartAction';
import PopupAddToCart from '../../components/popupAddToCart';
import * as Animatable from 'react-native-animatable';

const nameIcon = 'arrow-back-outline';

const ProducDetailScreen = ({route, navigation}) => {
  // get product id
  const {item} = route.params;

  // use dispatch
  const dispatch = useDispatch();

  // get appTheme from store
  const appTheme = useSelector(getAppThemeSelector);

  // get access token
  const accessToken = useSelector(getAccessTokenSelector);

  // get productsFavorite
  const productsFavorite = useSelector(getProductsFavoriteSelector);

  // get product by id from redux
  const product = useSelector(getProductByIdSelector);

  // state for product was liked
  const [productFavorite, setProductFavorite] = useState(false);

  // state show description
  const [showDescript, setShowDescript] = useState(false);

  // state size selected
  const [sizeSelected, setSizeSelected] = useState('');

  // state show hide popup
  const [showHidePopup, setShowHidePopup] = useState(false);

  useEffect(() => {
    // get product by id
    dispatch(actFetchGetProductByIdRequest(item.id));

    // set product favorite
    if (typeof productsFavorite == 'object') {
      productsFavorite.forEach(e => {
        if (e.id == item.id) {
          setProductFavorite(true);
        }
      });
    }
  }, []);

  // handler show description
  const handlerShowDescript = () => {
    setShowDescript(!showDescript);
  };

  // handler selected size
  const handlerSelectedSize = size => {
    setSizeSelected(size);
  };

  // save products favorite to storage
  const saveProductsFavoriteToStorage = async data => {
    return await setProductsFavoriteToStorage(data);
  };

  // save product to redux and storage
  const saveProductToReduxAndStorage = token => {
    getProductsFavoriteFromAPI(token)
      .then(res => {
        const response = res.data.content.productsFavorite;
        dispatch(hanlderSetProductFavorite(response));
        saveProductsFavoriteToStorage(JSON.stringify(response));
      })
      .catch(err => console.log(err));
  };

  // handler when click like button
  const handlerLikeOrUnLikeProduct = () => {
    if (productFavorite) {
      setProductFavorite(false);
      unLikeProductAPI(item.id, accessToken)
        .then(res => {
          saveProductToReduxAndStorage(accessToken);
        })
        .catch(err => console.log(err));
    } else {
      setProductFavorite(true);
      likeProductAPI(item.id, accessToken)
        .then(res => {
          saveProductToReduxAndStorage(accessToken);
        })
        .catch(err => console.log(err));
    }
  };

  //handler show hide popup
  const handlerShowHidePopup = () => {
    setShowHidePopup(!showHidePopup);
  };

  // handler add product to cart
  const handlerAddProductToCart = product => {
    // save to redux
    dispatch(addProductToCart(product));
    // show popup
    setShowHidePopup(true);
  };

  // handler checkout product
  const handlerCheckoutProduct = product => {
    // save to redux
    dispatch(addProductToCart(product));
    navigation.navigate('PaymentScreen');
  };

  // render list sizes
  const renderListSize = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.sizeItemStyle,
          {
            backgroundColor:
              sizeSelected == item ? COLORS.primary : COLORS.silver,
            shadowColor:
              appTheme.name == 'dark' ? COLORS.lightGray2 : COLORS.gray3,
          },
        ]}
        onPress={() => handlerSelectedSize(`${item}`)}>
        <Text style={[styles.sizeItemText]}>{item}</Text>
      </TouchableOpacity>
    );
  };

  //render list related
  const renderRelatedList = ({item, index}) => {
    return (
      <Animatable.View
        animation="bounceIn"
        delay={SIZES.duration + index * 500}
        style={[
          styles.relatedItem,
          {
            shadowColor: appTheme.shadowColor,
          },
        ]}>
        <Image source={{uri: item.image}} style={styles.imageRelated} />
      </Animatable.View>
    );
  };

  return (
    <View style={[styles.container, {opacity: showHidePopup ? 0.5 : 1}]}>
      {/* POPUP */}
      {showHidePopup && (
        <PopupAddToCart
          showHidePopup={showHidePopup}
          handlerShowHidePopup={handlerShowHidePopup}
        />
      )}
      {/* POPUP */}
      <HeaderBar nameIcon={nameIcon} customStyle={styles.customStyle} />
      <View style={[styles.contentContainer]}>
        <SharedElement id={product.id}>
          <Animatable.View
            animation="fadeInDown"
            delay={400}
            style={[
              styles.imageContainer,
              {
                shadowColor: appTheme.shadowColor,
                backgroundColor: appTheme.flatlistbackgroundItem,
              },
            ]}>
            <Image source={{uri: product.image}} style={styles.imageStyle} />
            <TouchableOpacity
              style={styles.likeButton}
              onPress={handlerLikeOrUnLikeProduct}>
              <FontAwesome
                name={productFavorite ? 'heart' : 'heart-o'}
                size={30}
                color={productFavorite ? COLORS.red : appTheme.textColor}
              />
            </TouchableOpacity>
          </Animatable.View>
        </SharedElement>

        <Animatable.View animation="fadeInUp" delay={800}>
          <ScrollView
            style={[
              styles.productContent,
              {
                backgroundColor: appTheme.flatlistbackgroundItem,
              },
            ]}>
            {/* PRICE - NAME */}
            <View style={styles.productInfo}>
              <View style={styles.productPrice}>
                <MatIcon
                  name="attach-money"
                  size={25}
                  color={appTheme.textColor}
                />
                <Text
                  style={[
                    styles.productPriceText,
                    {color: appTheme.textColor},
                  ]}>
                  {product.price}
                </Text>
              </View>
              <Text style={[styles.productName, {color: appTheme.textColor}]}>
                {product.name}
              </Text>
            </View>
            {/* PRICE - NAME */}

            {/* SIZE */}
            <View style={styles.sizeContainer}>
              <Text style={[styles.sizeTitle, {color: appTheme.textColor}]}>
                Available Size
              </Text>
              <FlatList
                data={product.size}
                keyExtractor={index => index.toString()}
                renderItem={renderListSize}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{width: 15}} />}
                contentContainerStyle={styles.listSizeStyle}
              />
            </View>
            {/* SIZE */}

            {/* DESCRIPTION */}
            <View style={styles.descriptionContainer}>
              <Text
                style={[styles.descriptionText, {color: appTheme.textColor}]}>
                Description
              </Text>
              {showDescript}
              <TouchableOpacity onPress={handlerShowDescript}>
                <Ionicons
                  name={showDescript ? 'chevron-up' : 'chevron-down-sharp'}
                  size={30}
                />
              </TouchableOpacity>
            </View>
            {showDescript && (
              <Text style={styles.descriptContent}>
                {product.description !== undefined
                  ? product.description.split('.')[0].trim()
                  : ''}
              </Text>
            )}
            {/* DESCRIPTION */}

            {/* RELATED PRODUCT */}
            <View style={styles.relatedContainer}>
              <Text style={[styles.relatedTitle, {color: appTheme.textColor}]}>
                Related product
              </Text>
              <FlatList
                data={product.relatedProducts}
                keyExtractor={item => item.id}
                renderItem={renderRelatedList}
                horizontal={true}
                contentContainerStyle={styles.relatedListContainer}
                ItemSeparatorComponent={() => <View style={{width: 20}} />}
              />
            </View>
            {/* RELATED PRODUCT */}

            {/* ADD - BUY */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.addCardBtn]}
                onPress={() => handlerAddProductToCart(product)}>
                <Text style={[styles.addCardStyle]}>Add To Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buyProductBtn}
                onPress={() => handlerCheckoutProduct(product)}>
                <Text style={styles.buyProductStyle}>Buy Now</Text>
              </TouchableOpacity>
            </View>
            {/* ADD - BUY */}
          </ScrollView>
        </Animatable.View>
      </View>
    </View>
  );
};

ProducDetailScreen.sharedElements = (route, otherNavigation, showing) => {
  const {item} = route.params;
  return [
    {
      id: item.id,
    },
  ];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginTop: -80,
    alignItems: 'center',
  },
  customStyle: {
    borderBottomLeftRadius: SIZES.radius * 3,
    borderBottomRightRadius: SIZES.radius * 3,
  },
  imageContainer: {
    height: 200,
    width: SIZES.width - 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius * 2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    position: 'relative',
  },
  imageStyle: {
    width: '90%',
    height: '90%',
  },
  productContent: {
    paddingTop: 15,
    marginTop: 20,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.radius * 3,
    borderTopRightRadius: SIZES.radius * 3,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  productPrice: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
    fontFamily: 'Roboto Mono',
  },
  descriptionText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  descriptContent: {
    marginHorizontal: 20,
    fontSize: 16,
    fontFamily: 'Roboto Mono',
  },
  listSizeStyle: {
    marginVertical: 5,
    marginHorizontal: 5,
    paddingRight: 20,
  },
  sizeContainer: {
    marginTop: 15,
    marginLeft: 20,
  },
  sizeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Roboto Mono',
  },
  sizeItemStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  sizeItemText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  relatedContainer: {
    marginTop: 15,
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    fontFamily: 'Roboto Mono',
  },
  relatedItem: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.darkgray,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  imageRelated: {
    width: 80,
    height: 50,
  },
  relatedListContainer: {
    marginHorizontal: 25,
    marginTop: 15,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  addCardBtn: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkgray,
  },
  addCardStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  buyProductBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 35,
    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyProductStyle: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  likeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
});

export default ProducDetailScreen;
