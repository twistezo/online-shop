import DataUtils from "../../data/DataUtils";
import { CartItem } from "../../data/DataGenerator";

class CartUtils {
  static recalculateTotalSum = cartItems =>
    cartItems.length > 0
      ? DataUtils.roundToTwoDecimalPlaces(
          cartItems.map(i => i.totalPrice).reduce((a, b) => a + b)
        )
      : 0;

  /**
   * Returns recalculated CartData and info about operation status
   */
  static recalculateOnAdd = (addedItemId, items, cartData) => {
    let isOk = false;
    if (CartUtils.itemNotExistsInCart(cartData, addedItemId)) {
      let item = DataUtils.getItemById(items, addedItemId);
      if (item.quantityOnStock > 0) {
        item.quantityOnStock -= 1;
        let newCartItem = new CartItem(addedItemId, item.price);
        newCartItem.setQuantity(1);
        cartData.cartItems.push(newCartItem);
        cartData.cartItemsSum = CartUtils.recalculateTotalSum(
          cartData.cartItems
        );
        isOk = true;
      }
    }

    return {
      cartData,
      isOk
    };
  };

  /**
   * Returns recalculated initialItems and cartData
   */
  static recalculateOnRemove = (cartItem, cartData, items) => {
    let previousCartDataItems = cartData.cartItems;
    let item = DataUtils.getItemById(items, cartItem.itemId);
    let cartItemIndex = cartData.cartItems
      .map(i => i.itemId)
      .indexOf(cartItem.itemId);
    let changedCartItem = cartData.cartItems[cartItemIndex];
    let quantitiesToGiveBack = changedCartItem.quantity;
    cartData.cartItems.splice(cartItemIndex, 1);
    cartData.cartItemsSum = CartUtils.recalculateTotalSum(
      previousCartDataItems
    );
    item.quantityOnStock += quantitiesToGiveBack;

    return {
      items,
      cartData
    };
  };

  /**
   * Returns recalculated initialItems and cartData
   */
  static recalculateAllAfterItemQuantityChange = (
    items,
    cartData,
    cartItem,
    initialItemQuantyToAdd,
    cartItemQuantityToAdd
  ) => {
    let initialItem = items.find(i => i.id === cartItem.itemId);
    let changedCartItem = cartData.cartItems.find(
      c => c.itemId === cartItem.itemId
    );

    if (
      // decrease quantity
      (initialItemQuantyToAdd > 0 && changedCartItem.quantity > 0) ||
      // increase quantity
      (initialItemQuantyToAdd < 0 && initialItem.quantityOnStock > 0)
    ) {
      initialItem.quantityOnStock += initialItemQuantyToAdd;
      let newQuantityOfChangedItem =
        changedCartItem.quantity + cartItemQuantityToAdd;
      changedCartItem.setQuantity(newQuantityOfChangedItem);
      cartData.cartItemsSum = CartUtils.recalculateTotalSum(cartData.cartItems);
    }

    return {
      items,
      cartData
    };
  };

  static itemNotExistsInCart = (cartData, itemId) =>
    cartData.cartItems.find(cartItem => cartItem.itemId === itemId) ===
    undefined;
}

export default CartUtils;
