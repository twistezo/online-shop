import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { CartItem, Item } from "../../data/DataGenerator";
import Info from "./Info";
import Checkout from "./Checkout";
import Summary from "./Summary";
import { Container } from "react-bootstrap";

class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutData: {}
    };
  }

  handleItemQuantityChange = (
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

  handleRemoveCartItem = cartItem => {
    this.props.onRemoveCartItem(cartItem);
  };

  handleConfirmCheckoutData = checkoutData => {
    this.setState(() => ({
      checkoutData
    }));
  };

  handlePurchaseComplete = () => {
    this.props.onPurchaseComplete();
  };

  InfoView = route => {
    return (
      <Info
        cartItems={this.props.cartItems}
        cartItemsSum={this.props.cartItemsSum}
        initialItems={this.props.initialItems}
        routeUrl={route.match.url}
        onChangeItemQuantity={this.handleItemQuantityChange}
        onRemoveCartItem={this.handleRemoveCartItem}
      />
    );
  };

  CheckoutView = route => {
    return (
      <Checkout
        cartItemsSum={this.props.cartItemsSum}
        routeUrl={route.match.url}
        onConfirmCheckoutData={this.handleConfirmCheckoutData}
      />
    );
  };

  SummaryView = route => {
    return (
      <Summary
        cartItemsSum={this.props.cartItemsSum}
        checkoutData={this.state.checkoutData}
        routeUrl={route.match.url}
        onPurchaseComplete={this.handlePurchaseComplete}
      />
    );
  };

  render() {
    return (
      <Container>
        <Route
          exact
          path={`${this.props.routeUrl}/info`}
          component={this.InfoView}
        />
        <Route
          eaxct
          path={`${this.props.routeUrl}/checkout`}
          component={this.CheckoutView}
        />
        <Route
          eaxct
          path={`${this.props.routeUrl}/summary`}
          component={this.SummaryView}
        />
      </Container>
    );
  }
}

CartContainer.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.instanceOf(CartItem)),
  cartItemsSum: PropTypes.number,
  initialItems: PropTypes.arrayOf(PropTypes.instanceOf(Item)),
  routeUrl: PropTypes.string,
  onChangeItemQuantity: PropTypes.func,
  onRemoveCartItem: PropTypes.func,
  onPurchaseComplete: PropTypes.func
};

export default CartContainer;
