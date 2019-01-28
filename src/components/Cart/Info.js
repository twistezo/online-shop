import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CartItem } from "../../data/DataGenerator";
import { Container, Row, Col, Button } from "react-bootstrap";

class Info extends Component {
  handleDecreaseQuantity = cartItem => {
    this.handleQuantity(cartItem, 1, -1);
  };

  handleIncreaseQuantity = cartItem => {
    this.handleQuantity(cartItem, -1, 1);
  };

  handleQuantity = (
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

  InfoView = () => {
    let initialItems = this.props.initialItems;
    let cartItems = this.props.cartItems;

    let cartItemsComponents = [];
    for (let i = 0; i < cartItems.length; i++) {
      let cartItem = cartItems[i];
      let item = initialItems.find(item => item.id === cartItem.itemId);
      cartItemsComponents.push(
        <Container key={i}>
          <Row>
            <Col sm={4}>
              {/* <Link to={"/item-id-" + item.id}>{item.name}</Link> */}
              {item.name}
            </Col>
            <Col sm={2}>
              <Row>
                <Col sm={4}>
                  <Button onClick={() => this.handleDecreaseQuantity(cartItem)}>
                    &#60;
                  </Button>
                </Col>
                <Col sm={4}>{cartItem.quantity}</Col>
                <Col sm={4}>
                  <Button onClick={() => this.handleIncreaseQuantity(cartItem)}>
                    &#62;
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col sm={2}>Price per unit: {cartItem.price} EUR</Col>
            <Col sm={2}>Total price: {cartItem.totalPrice} EUR</Col>
            <Col sm={2}>
              <Button onClick={() => this.handleRemoveCartItem(cartItem)}>
                x
              </Button>
            </Col>
          </Row>
        </Container>
      );
    }

    return (
      <Container>
        <Row>{cartItemsComponents}</Row>
        <Row>
          <Container>
            <Row>
              <h5>Sum: {this.props.cartItemsSum} EUR</h5>
            </Row>
            <Row>
              <Link to={`checkout`}>
                <Button>Checkout</Button>
              </Link>
            </Row>
          </Container>
        </Row>
      </Container>
    );
  };

  render() {
    return <this.InfoView />;
  }
}

Info.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.instanceOf(CartItem))
};

export default Info;
