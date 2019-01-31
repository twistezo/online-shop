import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { CartItem, Item, Category } from "../../data/DataGenerator";
import Info from "./Info";
import Checkout from "./Checkout";
import Summary from "./Summary";
import { Container } from "react-bootstrap";

class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutData: {},
      totalPrice: 0
    };
  }

  handleQuantityChange = (
    cartItem,
    initialItemQuantyToAdd,
    cartItemQuantityToAdd
  ) => {
    this.props.onChangeItemQuantity(
      cartItem,
      initialItemQuantyToAdd,
      cartItemQuantityToAdd
    );
  };

  handleRemove = cartItem => {
    this.props.onRemoveCartItem(cartItem);
  };

  handleCheckoutConfirm = (checkoutData, totalPrice) => {
    this.setState(() => ({
      checkoutData,
      totalPrice
    }));
  };

  handlePurchaseComplete = () => {
    this.props.onPurchaseComplete();
  };

  render() {
    return (
      <Container>
        <Route
          exact
          path={`${this.props.routeUrl}/info`}
          component={route => (
            <Info
              cartItems={this.props.cartItems}
              cartItemsSum={this.props.cartItemsSum}
              initialItems={this.props.initialData.items}
              routeUrl={route.match.url}
              onChangeItemQuantity={this.handleQuantityChange}
              onRemoveCartItem={this.handleRemove}
            />
          )}
        />
        <Route
          eaxct
          path={`${this.props.routeUrl}/checkout`}
          component={route => (
            <Checkout
              cartItemsSum={this.props.cartItemsSum}
              paymentMethods={this.props.initialData.paymentMethods}
              deliveryOptions={this.props.initialData.deliveryOptions}
              routeUrl={route.match.url}
              onConfirmCheckoutData={this.handleCheckoutConfirm}
            />
          )}
        />
        <Route
          eaxct
          path={`${this.props.routeUrl}/summary`}
          component={route => (
            <Summary
              cartItemsSum={this.state.totalPrice}
              checkoutData={this.state.checkoutData}
              routeUrl={route.match.url}
              onPurchaseComplete={this.handlePurchaseComplete}
            />
          )}
        />
      </Container>
    );
  }
}

CartContainer.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.instanceOf(CartItem)),
  cartItemsSum: PropTypes.number,
  initialData: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.instanceOf(Item)),
    categories: PropTypes.arrayOf(PropTypes.instanceOf(Category)),
    paymentMethods: PropTypes.arrayOf(PropTypes.string),
    deliveryOptions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.num
      })
    )
  }),
  routeUrl: PropTypes.string,
  onChangeItemQuantity: PropTypes.func,
  onRemoveCartItem: PropTypes.func,
  onPurchaseComplete: PropTypes.func
};

export default CartContainer;
