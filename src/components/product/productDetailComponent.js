import React from 'react';
import {
  FlatList, Image,
  ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { CustomPopup, HeaderBar, IconButton, TextButton } from '../../components/common';
import { COLORS, ICONS, IMAGES, SIZES } from '../../constants';
import { navigate } from '../../navigations/service';
import { appThemeSelector } from '../../redux/selectors/themeSelector';

const ProductDetailComponent = (props) => {
  const {
    product,
    showDescript,
    showHidePopup,
    productFavorite,
    sizeSelected,
    handlerClickKeepShopping,
    handlerShowDescript,
    handlerSelectedSize,
    handlerAddProductToCart,
    handlerClickGoToCart,
    handlerLikeOrUnLikeProduct,
    handlerCheckoutProduct
  } = props;
  const appTheme = useSelector(appThemeSelector);

  return (
    <View style={[styles.container, {opacity: showHidePopup ? 0.5 : 1}]}>
      {showHidePopup && (
        <CustomPopup
          isVisible={showHidePopup}
          icon={IMAGES.order_success}
          title="Awesome!"
          content="You have added this item to your shopping cart"
          leftButton="Keep Shopping"
          rightButton="Go To Cart"
          onPressLeftButton={handlerClickKeepShopping}
          onPressRightButton={handlerClickGoToCart}
        />
      )}

      <HeaderBar nameIcon={ICONS.arrow_back} customStyle={styles.customStyle} />

      <View style={styles.contentContainer}>
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
          <IconButton 
            icon={productFavorite ? ICONS.heart_fill : ICONS.heart}
            buttonContainerStyle={styles.likeButton}
            onPress={handlerLikeOrUnLikeProduct}
          />
        </Animatable.View>

        <ScrollView 
          style={[styles.productContent, {backgroundColor: appTheme.flatlistbackgroundItem}]}
          contentContainerStyle={{paddingBottom: 50}}
          showsVerticalScrollIndicator={false}>
          <Animatable.View animation="fadeInUp" delay={800}>
            <View style={styles.productInfo}>
              <Text style={[styles.textStyle, {color: appTheme.textColor}]}>${product.price}</Text>
              <View style={{width: '60%'}}>
                <Text style={[styles.textStyle, {color: appTheme.textColor, textAlign: 'center'}]}>{product.name}</Text>
              </View>
            </View>

            <View style={styles.sizeContainer}>
              <Text style={[styles.textStyle, {color: appTheme.textColor, marginLeft: SIZES.padding}]}>Available Size</Text>
              <FlatList
                data={product.size}
                keyExtractor={index => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listSizeStyle}
                renderItem={({item, index}) => (
                  <TextButton 
                    title={item}
                    key={index}
                    buttonContainerStyle={[
                      styles.sizeListStyle,
                      {
                        backgroundColor: sizeSelected == item ? COLORS.primary : COLORS.silver,
                        shadowColor: appTheme.shadowColor,
                        marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                        marginRight: index == product.size.length - 1 ? SIZES.radius : 0
                      },
                    ]}
                    titleStyle={styles.sizeItemText}
                    onPress={() => handlerSelectedSize(`${item}`)}
                  />
                )}
              />
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={[styles.descriptionText, {color: appTheme.textColor}]}>Description</Text>

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

            <View style={styles.relatedContainer}>
              <Text style={[styles.relatedTitle, {color: appTheme.textColor}]}>Related product</Text>
              <FlatList
                data={product.relatedProducts}
                keyExtractor={item => item.id}
                horizontal={true}
                contentContainerStyle={styles.relatedListContainer}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <Animatable.View
                    animation="bounceIn"
                    delay={SIZES.duration + index * 500}
                    style={[styles.relatedItem,
                      {
                        shadowColor: appTheme.shadowColor,
                        marginLeft: index == 0 ? SIZES.padding : SIZES.padding,
                        marginRight: index == product?.relatedProducts.length - 1 ? SIZES.padding : 0
                      },
                    ]}>
                    <Image source={{uri: item.image}} style={styles.imageRelated} />
                  </Animatable.View>
                )}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TextButton 
                title="Add To Cart"
                buttonContainerStyle={styles.addCardBtn}
                onPress={() => handlerAddProductToCart(product)}
              />
              <TextButton 
                title="Buy Now"
                buttonContainerStyle={styles.buyProductBtn}
                titleStyle={{color: COLORS.white}}
                onPress={() => handlerCheckoutProduct(product)}
              />
            </View>
          </Animatable.View>
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
    marginTop: -SIZES.size_80,
    alignItems: 'center',
  },
  customStyle: {
    borderBottomLeftRadius: SIZES.radius * 3,
    borderBottomRightRadius: SIZES.radius * 3,
  },
  imageContainer: {
    height: SIZES.size_200,
    width: SIZES.deviceWidth - SIZES.padding * 2,
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
    paddingTop: SIZES.size_15,
    marginTop: SIZES.size_20,
    borderTopLeftRadius: SIZES.radius * 3,
    borderTopRightRadius: SIZES.radius * 3,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.size_10,
    paddingHorizontal: SIZES.padding
  },
  textStyle: {
    fontSize: SIZES.size_20,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.size_20,
    fontFamily: 'Roboto Mono',
    paddingHorizontal: SIZES.padding
  },
  descriptionText: {
    fontSize: SIZES.size_20,
    fontWeight: 'bold',
    fontFamily: 'Roboto Mono',
  },
  descriptContent: {
    fontSize: SIZES.size_16,
    fontFamily: 'Roboto Mono',
    paddingHorizontal: SIZES.padding
  },
  listSizeStyle: {
    marginVertical: SIZES.size_10,
    marginHorizontal: SIZES.size_5,
    paddingRight: SIZES.size_20,
  },
  sizeContainer: {
    marginTop: SIZES.size_15,
  },
  sizeListStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.size_15,
    paddingVertical: SIZES.size_10,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  sizeItemText: {
    fontWeight: 'bold',
    fontSize: SIZES.size_18,
  },
  relatedContainer: {
    marginTop: SIZES.size_15,
  },
  relatedTitle: {
    fontSize: SIZES.size_20,
    fontWeight: 'bold',
    marginLeft: SIZES.size_20,
    fontFamily: 'Roboto Mono',
  },
  relatedItem: {
    borderRadius: SIZES.size_10,
    paddingHorizontal: SIZES.size_10,
    paddingVertical: SIZES.size_10,
    backgroundColor: COLORS.darkgray,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  imageRelated: {
    width: SIZES.size_80,
    height: SIZES.size_50,
  },
  relatedListContainer: {
    marginTop: SIZES.size_15,
    marginVertical: SIZES.size_10,
  },
  buttonContainer: {
    marginTop: SIZES.size_20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding
  },
  addCardBtn: {
    paddingHorizontal: SIZES.size_20,
    paddingVertical: SIZES.size_20,
    borderRadius: SIZES.size_10,
    backgroundColor: COLORS.darkgray,
  },
  buyProductBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.size_35,
    paddingVertical: SIZES.size_20,
    borderRadius: SIZES.size_10,
  },
  likeButton: {
    position: 'absolute',
    top: SIZES.size_5,
    right: SIZES.size_10,
  },
});

export default ProductDetailComponent;
