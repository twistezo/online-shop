import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { CartItem } from "../../data/DataGenerator";
import Info from "./Info";
import Checkout from "./Checkout";
import Summary from "./Summary";
import { Container } from "react-bootstrap";
import { runInThisContext } from "vm";

const style = {
  backgroundColor: "lightGray",
  padding: "15px 15px 15px 15px"
};

class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      />
    );
  };

  SummaryView = route => {
    return (
      <Summary
        cartItemsSum={this.props.cartItemsSum}
        routeUrl={route.match.url}
      />
    );
  };

  render() {
    return (
      <Container style={style}>
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
  cartItems: PropTypes.arrayOf(PropTypes.instanceOf(CartItem))
};

export default CartContainer;
