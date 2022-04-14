import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartComponent } from '../../components';
import {
  decrementQuantityAction,
  incrementQuantityAction,
  removeFromCartAction
} from '../../redux/actions/cartAction';
import { cartSelector } from '../../redux/selectors/cartSelector';
import { saveShoppingCarts, setCartsToStorage } from '../../utils/storage';

const CartScreen = () => {
  const dispatch = useDispatch();

  const cartInfo = useSelector(cartSelector);

  const [totalCart, setTotalCart] = useState(0);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let totalPrice = 0;
    cartInfo.carts.forEach(item => {
      totalPrice += item.quantity * item.price;
    });
    setTotalCart(totalPrice);

    saveShoppingCarts(cartInfo);
    
  }, [cartInfo]);

  const handlerIncrementQuantity = item => {
    dispatch(incrementQuantityAction(item));
  };

  const handlerDecrementQuantity = (item, handleShowPopup) => {
    if (item.quantity > 1) {
      dispatch(decrementQuantityAction(item));
    } else {
      handleShowPopup();
    }
  };

  const handlerRemoveProductFromCart = async item => {
    setShowPopup(false);
    dispatch(removeFromCartAction(item));
  };

  return (
    <CartComponent
      cartInfo={cartInfo}
      totalCart={totalCart}
      showPopup={showPopup}
      handlerIncrementQuantity={handlerIncrementQuantity}
      handlerDecrementQuantity={handlerDecrementQuantity}
      handlerRemoveProductFromCart={handlerRemoveProductFromCart}
      setShowPopup={setShowPopup}
    />
  );
};

export default CartScreen;
