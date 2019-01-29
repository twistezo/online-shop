import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
      },
      formValidation: {
        name: false,
        email: false,
        address: false,
        paymentMethod: false,
        creditCardNumber: false,
        creditCardExpirationDate: false,
        deliveryOption: false
      },
      isFormValid: false,
      isFieldValidated: false,
      regex: {
        creditCardNumber:
          "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$",
        creditCardExpirationDate: "^(0[1-9]|1[0-2])/?([0-9]{4}|[0-9]{2})$"
      }
    };
  }

  handlePaymentMethodChange = e => {
    let value = e.target.value;
    let formValidation = this.state.formValidation;
    if (value !== "Choose...") {
      formValidation.paymentMethod = true;
      if (value === this.state.paymentMethods[0]) {
        formValidation.creditCardExpirationDate = false;
        formValidation.creditCardNumber = false;
        this.setState(() => ({
          formData: {
            ...this.state.formData,
            paymentMethod: value
          },
          showCreditCardExtraFields: true,
          formValidation,
          isFormValid: this.allFieldsAreValid(formValidation)
        }));
      } else {
        formValidation.creditCardExpirationDate = true;
        formValidation.creditCardNumber = true;
        this.setState(() => ({
          formData: {
            ...this.state.formData,
            paymentMethod: value
          },
          showCreditCardExtraFields: false,
          formValidation,
          isFormValid: this.allFieldsAreValid(formValidation)
        }));
      }
    } else {
      formValidation.paymentMethod = false;
      formValidation.creditCardExpirationDate = false;
      formValidation.creditCardNumber = false;
      this.setState(() => ({
        formValidation,
        isFormValid: this.allFieldsAreValid(formValidation)
      }));
    }
  };

  handleDeliveryOptionChange = e => {
    let value = e.target.value;
    let formValidation = this.state.formValidation;
    if (value !== "Choose...") {
      formValidation.deliveryOption = true;
      this.setState(() => ({
        controllers: {
          ...this.state.controllers,
          showTotalPrice: true
        },
        formData: {
          ...this.state.formData,
          deliveryOption: value
        },
        formValidation,
        isFormValid: this.allFieldsAreValid(formValidation)
      }));
    } else {
      formValidation.deliveryOption = false;
      this.setState(() => ({
        controllers: {
          ...this.state.controllers,
          showTotalPrice: false
        },
        formValidation,
        isFormValid: this.allFieldsAreValid(formValidation)
      }));
    }

    let option = this.state.deliveryOptions.find(
      o => o.name.substring(0, 2) === value.substring(0, 2)
    );
    let newTotalPrice = this.props.cartItemsSum;
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
    let isFieldValid = e.target.checkValidity() === true;
    let formValidation = this.state.formValidation;

    if (targetName === "name") {
      formValidation.name = isFieldValid;
      this.setState(() => ({
        formData: {
          ...this.state.formData,
          name: targetValue
        },
        formValidation,
        isFormValid: this.allFieldsAreValid(formValidation)
      }));
    } else if (targetName === "email") {
      formValidation.email = isFieldValid;
      this.setState(() => ({
        formData: {
          ...this.state.formData,
          email: targetValue
        },
        formValidation,
        isFormValid: this.allFieldsAreValid(formValidation)
      }));
    } else if (targetName === "address") {
      formValidation.address = isFieldValid;
      this.setState(() => ({
        formData: {
          ...this.state.formData,
          address: targetValue
        },
        formValidation,
        isFormValid: this.allFieldsAreValid(formValidation)
      }));
    } else if (targetName === "creditCardNumber") {
      formValidation.creditCardNumber = isFieldValid;
      this.setState(() => ({
        formData: {
          ...this.state.formData,
          creditCardNumber: targetValue
        },
        formValidation,
        isFormValid: this.allFieldsAreValid(formValidation)
      }));
    } else if (targetName === "creditCardExpirationDate") {
      formValidation.creditCardExpirationDate = isFieldValid;

      this.setState(() => ({
        formData: {
          ...this.state.formData,
          creditCardExpirationDate: targetValue
        },
        formValidation,
        isFormValid: this.allFieldsAreValid(formValidation)
      }));
    }
    this.setState({ isFieldValidated: true });
  };

  allFieldsAreValid = formValidaton =>
    Object.values(formValidaton).every(v => v === true);

  handleConfirmButton = () => {
    this.props.onConfirmCheckoutData(this.state.formData);
  };

  CheckoutView = () => {
    return (
      <Container>
        <Col sm={6}>
          <Form validated={this.state.isFieldValidated}>
            <Form.Group>
              <Form.Label>Full name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Ex. John Smith"
                required
                onChange={this.handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                This field is required.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="example@gmail.com"
                required
                onChange={this.handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Incorrect email format.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                placeholder="Street, city, postalcode"
                required
                onChange={this.handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                This field is required.
              </Form.Control.Feedback>
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
                  placeholder="Ex. 5500000000000004"
                  pattern={this.state.regex.creditCardNumber}
                  onChange={this.handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Invalid format. Ex. 5500000000000004
                </Form.Control.Feedback>
              </Form.Group>
            )}
            {this.state.showCreditCardExtraFields && (
              <Form.Group>
                <Form.Label>Credit card expiration date</Form.Label>
                <Form.Control
                  name="creditCardExpirationDate"
                  type="text"
                  placeholder="Ex. 02/19"
                  pattern={this.state.regex.creditCardExpirationDate}
                  onChange={this.handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Invalid format. Ex. 02/19
                </Form.Control.Feedback>
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
              <Button
                disabled={!this.state.isFormValid}
                onClick={this.handleConfirmButton}
              >
                Confirm
              </Button>
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
  cartItemsSum: PropTypes.number,
  routeUrl: PropTypes.string,
  onConfirmCheckoutData: PropTypes.func
};

export default Checkout;
