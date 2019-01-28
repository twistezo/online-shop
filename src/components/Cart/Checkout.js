import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CartItem } from "../../data/DataGenerator";
import { Container, Col, Button, Form } from "react-bootstrap";
import { roundToTwoDecimalPlaces } from "../../data/Utils";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethods: ["Credit Card", "PayPal", "PayU"],
      deliveryOptions: [
        {
          name: "UPS",
          price: 14.99
        },
        {
          name: "DHL",
          price: 16.99
        },
        {
          name: "DPD",
          price: 18.99
        }
      ],
      totalPrice: 0,
      controllers: {
        showTotalPrice: false,
        showCreditCardExtraFields: false
      },
      formData: {
        name: "",
        email: "",
        address: "",
        paymentMethod: "",
        creditCardNumber: "",
        creditCardExpirationDate: "",
        deliveryOption: {}
      }
    };
  }

  componentDidUpdate() {
    console.log(this.state.formData);
  }

  handlePaymentMethodChange = e => {
    let value = e.target.value;
    if (value !== "Choose...") {
      if (value === this.state.paymentMethods[0]) {
        this.setState(() => ({
          formData: {
            ...this.state.formData,
            paymentMethod: value
          },
          showCreditCardExtraFields: true
        }));
      } else {
        this.setState(() => ({
          formData: {
            ...this.state.formData,
            paymentMethod: value
          },
          showCreditCardExtraFields: false
        }));
      }
    }
  };

  handleDeliveryOptionChange = e => {
    let value = e.target.value;
    if (value !== "Choose...") {
      this.setState(() => ({
        controllers: {
          ...this.state.controllers,
          showTotalPrice: true
        }
      }));
    } else {
      this.setState(() => ({
        controllers: {
          ...this.state.controllers,
          showTotalPrice: false
        }
      }));
    }

    let option = this.state.deliveryOptions.find(
      o => o.name.substring(0, 2) === value.substring(0, 2)
    );
    let newTotalPrice = this.props.totalPrice;
    if (option !== undefined) {
      newTotalPrice += option.price;
      newTotalPrice = roundToTwoDecimalPlaces(newTotalPrice);
      this.setState(() => ({
        formData: {
          ...this.state.formData,
          deliveryOption: option
        },
        totalPrice: newTotalPrice
      }));
    }
  };

  handleInputChange = e => {
    let targetName = e.target.name;
    let targetValue = e.target.value;
    if (targetName === "name") {
      this.setState(() => ({
        formData: {
          ...this.setState.formData,
          name: targetValue
        }
      }));
    } else if (targetName === "email") {
      this.setState(() => ({
        formData: {
          ...this.setState.formData,
          email: targetValue
        }
      }));
    } else if (targetName === "address") {
      this.setState(() => ({
        formData: {
          ...this.setState.formData,
          address: targetValue
        }
      }));
    } else if (targetName === "creditCardNumber") {
      this.setState(() => ({
        formData: {
          ...this.setState.formData,
          creditCardNumber: targetValue
        }
      }));
    } else if (targetName === "creditCardExpirationDate") {
      this.setState(() => ({
        formData: {
          ...this.setState.formData,
          creditCardExpirationDate: targetValue
        }
      }));
    }
  };

  handleBuyButton = () => {
    console.log("handleBuyButton");
  };

  CheckoutView = () => {
    return (
      <Container>
        <Col sm={6}>
          <Form>
            <Form.Group>
              <Form.Label>Full name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Ex. John Smith"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="example@gmail.com"
                onChange={this.handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                placeholder="Street, city, postalcode"
                onChange={this.handleInputChange}
              />{" "}
            </Form.Group>
            <Form.Group>
              <Form.Label>Payment method</Form.Label>
              <Form.Control
                as="select"
                onChange={e => this.handlePaymentMethodChange(e)}
              >
                <this.PaymentMethods />
              </Form.Control>
            </Form.Group>
            {this.state.showCreditCardExtraFields && (
              <Form.Group>
                <Form.Label>Credit card number</Form.Label>
                <Form.Control
                  name="creditCardNumber"
                  type="text"
                  placeholder="Ex. 5500 0000 0000 0004"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            )}
            {this.state.showCreditCardExtraFields && (
              <Form.Group>
                <Form.Label>Credit card expiration date</Form.Label>
                <Form.Control
                  name="creditCardExpirationDate"
                  type="text"
                  placeholder="Ex. 02/19"
                  onChange={this.handleInputChange}
                />
              </Form.Group>
            )}
            <Form.Group>
              <Form.Label>Delivery option</Form.Label>
              <Form.Control
                as="select"
                onChange={e => this.handleDeliveryOptionChange(e)}
              >
                <this.DeliveryOptions />
              </Form.Control>
            </Form.Group>
            {this.state.controllers.showTotalPrice && (
              <p>Sum: {this.state.totalPrice} EUR</p>
            )}
            <Link to={`info`}>
              <Button>Back</Button>
            </Link>
            <Link to={`summary`}>
              <Button onClick={this.handleBuyButton}>Buy</Button>
            </Link>
          </Form>
        </Col>
      </Container>
    );
  };

  PaymentMethods = () => {
    let options = [];
    options.push(<option key={0}>Choose...</option>);
    for (let i = 0; i < this.state.paymentMethods.length; i++) {
      options.push(<option key={i + 1}>{this.state.paymentMethods[i]}</option>);
    }
    return options;
  };

  DeliveryOptions = () => {
    let options = [];
    options.push(<option key={0}>Choose...</option>);
    for (let i = 0; i < this.state.deliveryOptions.length; i++) {
      options.push(
        <option key={i + 1}>
          {this.state.deliveryOptions[i].name +
            " - " +
            this.state.deliveryOptions[i].price +
            " EUR"}
        </option>
      );
    }
    return options;
  };

  render() {
    return <this.CheckoutView />;
  }
}

Checkout.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.instanceOf(CartItem))
};

export default Checkout;
