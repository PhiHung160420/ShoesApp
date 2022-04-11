import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartComponent } from '../../components';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart
} from '../../redux/actions/cartAction';
import { getCartsSelector } from '../../redux/selectors/cartSelector';
import { setCartsToStorage } from '../../utils/storage';

const CartScreen = () => {
  const dispatch = useDispatch();

  const cartInfo = useSelector(getCartsSelector);

  const [totalCart, setTotalCart] = useState(0);

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    let totalPrice = 0;
    cartInfo.carts.forEach(item => {
      totalPrice += item.quantity * item.price;
    });
    setTotalCart(totalPrice);

    const handlerSaveCartToStorage = async data => {
      return await setCartsToStorage(data);
    };

    handlerSaveCartToStorage(JSON.stringify(cartInfo));
  }, [cartInfo]);

  const handlerIncrementQuantity = item => {
    dispatch(incrementQuantity(item));
  };

  const handlerDecrementQuantity = (item, handleShowPopup) => {
    if (item.quantity > 1) {
      dispatch(decrementQuantity(item));
    } else {
      handleShowPopup();
    }
  };

  const handlerRemoveProductFromCart = async item => {
    setShowPopup(false);
    dispatch(removeFromCart(item));
    await removeCartsInStorage();
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
