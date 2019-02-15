import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CartItem, Item } from "../../data/DataGenerator";
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

  handleRemoveFromCart = cartItem => {
    this.props.onRemoveCartItem(cartItem);
  };

  InfoView = () => {
    const initialItems = this.props.initialItems;
    const cartItems = this.props.cartItems;
    let cartItemsComponents = [];

    cartItems.forEach((cartItem, i) => {
      const cartItemQuantityIsZero = cartItem.quantity === 0;
      const item = initialItems.find(item => item.id === cartItem.itemId);
      cartItemsComponents.push(
        <Container key={i}>
          <Row className="text-center">
            <Col xs={6} sm={2} className="pb-4 pb-sm-0">
              <Link
                to={process.env.PUBLIC_URL + "/item-details/item-id-" + item.id}
              >
                <img
                  className="cartItemImage"
                  alt=""
                  src={item.imagesSources[0]}
                />
              </Link>
            </Col>
            <Col xs={6} sm={3} className="pb-4 pb-sm-0 align-self-center">
              <Link
                to={process.env.PUBLIC_URL + "/item-details/item-id-" + item.id}
              >
                {item.name}
              </Link>
            </Col>
            <Col xs={12} sm={2} className="pb-4 pb-sm-0 align-self-center">
              <Row>
                <Col xs={4} sm={4}>
                  <Button
                    className="float-left"
                    disabled={cartItemQuantityIsZero}
                    onClick={() => this.handleDecreaseQuantity(cartItem)}
                  >
                    <i className="fas fa-minus" />
                  </Button>
                </Col>
                <Col xs={4} sm={4} className="align-self-center">
                  {cartItem.quantity}
                </Col>
                <Col xs={4} sm={4}>
                  <Button
                    className="float-none float-sm-right"
                    onClick={() => this.handleIncreaseQuantity(cartItem)}
                  >
                    <i className="fas fa-plus" />
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col xs={12} sm={2} className="pb-4 pb-sm-0 align-self-center">
              {cartItem.price} EUR/unit
            </Col>
            <Col xs={12} sm={2} className="pb-4 pb-sm-0 align-self-center">
              Total: {cartItem.totalPrice} EUR
            </Col>
            <Col xs={12} sm={1} className="align-self-center">
              <Button onClick={() => this.handleRemoveFromCart(cartItem)}>
                <i className="fas fa-trash-alt" />
              </Button>
            </Col>
          </Row>
          <hr />
        </Container>
      );
    });

    const sumIsZero = this.props.cartItemsSum === 0;
    return (
      <Container>
        <Row>{cartItemsComponents}</Row>
        <Row className="pt-2">
          <Container>
            <Row>
              <Col>
                <h4 className="float-right">{this.props.cartItemsSum} EUR</h4>
              </Col>
            </Row>
            <Row className="pt-1">
              <Col>
                <Link to={`checkout`}>
                  <Button className="float-right" disabled={sumIsZero}>
                    Checkout
                  </Button>
                </Link>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    );
  };

  render() {
    const cartIsEmpty = this.props.cartItems.length === 0;
    return (
      <Container>
        {cartIsEmpty ? (
          <div className="text-center">
            <h2>Cart is empty. Pick something.</h2>
          </div>
        ) : (
          <this.InfoView />
        )}
      </Container>
    );
  }
}

Info.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.instanceOf(CartItem)),
  cartItemsSum: PropTypes.number,
  initialItems: PropTypes.arrayOf(PropTypes.instanceOf(Item)),
  routeUrl: PropTypes.string,
  onChangeItemQuantity: PropTypes.func,
  onRemoveCartItem: PropTypes.func
};

export default Info;
