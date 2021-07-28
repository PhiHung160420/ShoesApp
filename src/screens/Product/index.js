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
import {useSelector} from 'react-redux';
import {getAppThemeSelector} from '../../redux/selectors/themeSelector';
import {getAccessTokenSelector} from '../../redux/selectors/authSelector';
import {getProductsFavoriteSelector} from '../../redux/selectors/productSelector';
import {COLORS, SIZES} from '../../constants';
import {getProductById, likeProduct} from '../../services/productAPI';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const nameIcon = 'arrow-back-outline';

const ProducDetailScreen = ({route}) => {
  // get product id
  const {productId} = route.params;

  // get access token
  const token = useSelector(getAccessTokenSelector);

  // get productsFavorite
  const productsFavorite = useSelector(getProductsFavoriteSelector);

  // state product
  const [product, setProduct] = useState({});

  const [isLiked, setIsLiked] = useState(false);

  // state show description
  const [showDescript, setShowDescript] = useState(false);

  // state size selected
  const [sizeSelected, setSizeSelected] = useState('');

  // get appTheme from store
  const appTheme = useSelector(getAppThemeSelector);

  useEffect(() => {
    // get product by id
    getProductById(productId)
      .then(res => setProduct(res.data.content))
      .catch(err => console.log(err));
    if (typeof productsFavorite == 'object') {
      productsFavorite.map(e => {
        if (e.id == productId) {
          setIsLiked(true);
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

  // handler when click like button
  const handlerLikeProduct = () => {
    likeProduct(productId, token)
      .then(res => console.log(res.data.content))
      .catch(err => console.log(err));
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
  const renderRelatedList = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.relatedItem,
          {
            shadowColor: appTheme.shadowColor,
            backgroundColor:
              appTheme.name == 'dark' ? COLORS.lightGray : COLORS.gainsboro,
          },
        ]}>
        <Image source={{uri: item.image}} style={styles.imageRelated} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderBar nameIcon={nameIcon} customStyle={styles.customStyle} />
      <View style={[styles.contentContainer]}>
        <View
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
            onPress={handlerLikeProduct}>
            <FontAwesome
              name={isLiked ? 'heart' : 'heart-o'}
              size={30}
              color={isLiked ? COLORS.red : appTheme.textColor}
            />
          </TouchableOpacity>
        </View>
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
                style={[styles.productPriceText, {color: appTheme.textColor}]}>
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
            <Text style={[styles.descriptionText, {color: appTheme.textColor}]}>
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
              style={[
                styles.addCardBtn,
                {
                  backgroundColor:
                    appTheme.name == 'dark' ? COLORS.lightGray : COLORS.silver,
                },
              ]}>
              <Text style={[styles.addCardStyle]}>Add To Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyProductBtn}>
              <Text style={styles.buyProductStyle}>Buy Now</Text>
            </TouchableOpacity>
          </View>
          {/* ADD - BUY */}
        </ScrollView>
      </View>
    </View>
  );
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
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
  },
  descriptionText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptContent: {
    marginHorizontal: 20,
    fontSize: 18,
  },
  listSizeStyle: {
    marginVertical: 5,
    marginHorizontal: 5,
    paddingRight: 20,
  },
  sizeContainer: {
    marginTop: 25,
    marginLeft: 20,
  },
  sizeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
  relatedItem: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.gainsboro,
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
  },
  addCardStyle: {
    fontSize: 20,
    fontWeight: 'bold',
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
  },
  likeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
});

export default ProducDetailScreen;
