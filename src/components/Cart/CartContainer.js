import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { CartItem, Item, Category } from "../../data/DataGenerator";
import Info from "./Info";
import CheckoutContainer from "./Checkout/CheckoutContainer";
import Summary from "./Summary";
import { Container } from "react-bootstrap";

class CartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutData: {
        name: "",
        email: "",
        address: "",
        paymentMethod: {
          value: this.props.initialData.paymentMethods[0],
          selected: this.props.initialData.paymentMethods[0]
        },
        creditCardNumber: "",
        creditCardExpirationDate: "",
        deliveryOption: {
          value: this.props.initialData.deliveryOptions[0],
          selected: this.props.initialData.deliveryOptions[0].name
        }
      }
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

  handleCheckoutDataChange = checkoutData => {
    this.setState(() => ({ checkoutData }));
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
            <CheckoutContainer
              cartItemsSum={this.props.cartItemsSum}
              checkoutData={this.state.checkoutData}
              paymentMethods={this.props.initialData.paymentMethods}
              deliveryOptions={this.props.initialData.deliveryOptions}
              routeUrl={route.match.url}
              onCheckoutDataChange={this.handleCheckoutDataChange}
            />
          )}
        />
        <Route
          eaxct
          path={`${this.props.routeUrl}/summary`}
          component={route => (
            <Summary
              cartItemsSum={this.props.cartItemsSum}
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
