import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import DataUtils from "../../data/DataUtils";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const value = e.target.value;
    let formValidation = this.state.formValidation;
    formValidation.paymentMethod = value !== "Choose...";
    formValidation.creditCardExpirationDate =
      value !== "Choose..." && value !== "Credit Card";
    formValidation.creditCardNumber = formValidation.creditCardExpirationDate;
    const showCreditCardExtraFields = value === "Credit Card";

    this.setState(() => ({
      formData: {
        ...this.state.formData,
        paymentMethod: value
      },
      showCreditCardExtraFields,
      formValidation,
      isFormValid: this.allFieldsAreValid(formValidation)
    }));
  };

  handleDeliveryOptionChange = e => {
    const value = e.target.value;
    let formValidation = this.state.formValidation;
    formValidation.deliveryOption = value !== "Choose...";
    const showTotalPrice = formValidation.deliveryOption;

    this.setState(() => ({
      controllers: {
        ...this.state.controllers,
        showTotalPrice
      },
      formData: {
        ...this.state.formData,
        deliveryOption: value
      },
      formValidation,
      isFormValid: this.allFieldsAreValid(formValidation)
    }));
    this.recalculateTotalPriceWithDeliveryOption(value);
  };

  recalculateTotalPriceWithDeliveryOption = inputTargetValue => {
    let option = this.props.deliveryOptions.find(
      o => o.name.substring(0, 2) === inputTargetValue.substring(0, 2)
    );
    let newTotalPrice = this.props.cartItemsSum;
    if (option !== undefined) {
      newTotalPrice += option.price;
      newTotalPrice = DataUtils.roundToTwoDecimalPlaces(newTotalPrice);
      this.setState(() => ({
        formData: {
          ...this.state.formData,
          deliveryOption: option
        },
        totalPrice: newTotalPrice
      }));
    }
  };

  handleFormInputChange = e => {
    let targetName = e.target.name;
    let targetValue = e.target.value;
    let isFieldValid = e.target.checkValidity() === true;
    let formValidation = this.state.formValidation;
    formValidation[targetName] = isFieldValid;

    this.setState(() => ({
      formData: {
        ...this.state.formData,
        [targetName]: targetValue
      },
      formValidation,
      isFormValid: this.allFieldsAreValid(formValidation),
      isFieldValidated: true
    }));
  };

  handleConfirmButton = () => {
    this.props.onConfirmCheckoutData(
      this.state.formData,
      this.state.totalPrice
    );
  };

  allFieldsAreValid = formValidaton =>
    Object.values(formValidaton).every(v => v === true);

  FormGroup = props => {
    return (
      <Form.Group>
        <Form.Label>{props.label}</Form.Label>
        <Form.Control
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          required={props.required}
          onChange={this.handleFormInputChange}
          pattern={props.pattern}
        />
        {props.withFeedback ? (
          <Form.Control.Feedback type="invalid">
            {props.feedback}
          </Form.Control.Feedback>
        ) : (
          ""
        )}
      </Form.Group>
    );
  };

  CheckoutView = () => {
    return (
      <Container>
        <Col sm={5} className="col-centered">
          <Form validated={this.state.isFieldValidated}>
            <this.FormGroup
              label={"Full name"}
              name={"name"}
              type={"text"}
              placeholder={"Ex. John Smith"}
              required={true}
              withFeedback={true}
              feedback={"This field is required."}
              pattern={null}
            />
            <this.FormGroup
              label={"Email"}
              name={"email"}
              type={"email"}
              placeholder={"example@gmail.com"}
              required={true}
              withFeedback={true}
              feedback={"Incorrect email format."}
              pattern={null}
            />
            <this.FormGroup
              label={"Address"}
              name={"address"}
              type={"text"}
              placeholder={"Street, city, postalcode"}
              required={true}
              withFeedback={true}
              feedback={"This field is required."}
              pattern={null}
            />
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
              <this.FormGroup
                label={"Credit card number"}
                name={"creditCardNumber"}
                type={"text"}
                placeholder={"Ex. 5500000000000004"}
                required={true}
                withFeedback={true}
                feedback={"Invalid format. Ex. 5500000000000004"}
                pattern={this.state.regex.creditCardNumber}
              />
            )}
            {this.state.showCreditCardExtraFields && (
              <this.FormGroup
                label={"Credit card expiration date"}
                name={"creditCardExpirationDate"}
                type={"text"}
                placeholder={"Ex. 02/19"}
                required={true}
                withFeedback={true}
                feedback={"Invalid format. Ex. 02/19"}
                pattern={this.state.regex.creditCardExpirationDate}
              />
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
              <h5 className="text-center">{this.state.totalPrice} EUR</h5>
            )}
            <Row className="text-center pt-2">
              <Col>
                <Link to={`info`}>
                  <Button>Back</Button>
                </Link>
              </Col>
              <Col>
                <Link to={`summary`}>
                  <Button
                    disabled={!this.state.isFormValid}
                    onClick={this.handleConfirmButton}
                  >
                    Confirm
                  </Button>
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Container>
    );
  };

  PaymentMethods = () => {
    let options = [];
    options.push(<option key={0}>Choose...</option>);
    this.props.paymentMethods.forEach((paymentMethod, i) => {
      options.push(<option key={i + 1}>{paymentMethod}</option>);
    });
    return options;
  };

  DeliveryOptions = () => {
    let options = [];
    options.push(<option key={0}>Choose...</option>);
    this.props.deliveryOptions.forEach((deliveryOption, i) => {
      options.push(
        <option key={i + 1}>
          {deliveryOption.name + " - " + deliveryOption.price + " EUR"}
        </option>
      );
    });
    return options;
  };

  render() {
    return <this.CheckoutView />;
  }
}

Checkout.propTypes = {
  cartItemsSum: PropTypes.number,
  paymentMethods: PropTypes.arrayOf(PropTypes.string),
  deliveryOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.num
    })
  ),
  routeUrl: PropTypes.string,
  onConfirmCheckoutData: PropTypes.func
};

export default Checkout;
