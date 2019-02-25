import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Container, Col, Row, Button, Form } from 'react-bootstrap'
import DataUtils from '../../../data/DataUtils'
import PaymentFormGroup from './PaymentFormGroup'
import DeliveryFormGroup from './DeliveryFormGroup'
import PersonalDataFormGroup from './PersonalDataFormGroup'

class CheckoutContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkoutData: props.checkoutData,
      deliveryPrice: props.checkoutData.deliveryOption.value.price,
      showTotalPrice: false,
      shouldCheckFieldValidity: false,
      isFormValid: false,
      regex: {
        creditCardNumber:
          '^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$',
        creditCardExpirationDate: '^(0[1-9]|1[0-2])/?([0-9]{4}|[0-9]{2})$'
      }
    }
  }

  handleTextFormGroupDataChange = event => {
    this.setState(() => ({
      checkoutData: {
        ...this.state.checkoutData,
        [event.target.name]: event.target.value
      },
      shouldCheckFieldValidity: true,
      isFormValid: this.isFormValid()
    }))
  }

  handleDeliveryOptionChange = event => {
    const targetValue = event.target.value
    const option = this.findDeliveryOptionByName(targetValue)
    let checkoutData = { ...this.state.checkoutData }
    checkoutData.deliveryOption.value = option
    checkoutData.deliveryOption.selected = targetValue

    this.setState(() => ({
      checkoutData,
      deliveryPrice: option.price,
      shouldCheckFieldValidity: true
    }))
    this.recalculateTotalPriceWithDeliveryOption(option)
  }

  handlePaymentMethodChange = event => {
    const option = event.target.value
    let checkoutData = { ...this.state.checkoutData }
    checkoutData.paymentMethod.value = option
    checkoutData.paymentMethod.selected = option

    this.setState(() => ({
      checkoutData,
      shouldCheckFieldValidity: true,
      isFormValid: option !== 'Credit Card'
    }))
  }

  handleButton = () => {
    this.props.onCheckoutDataChange(this.state.checkoutData, this.isFormValid())
  }

  recalculateTotalPriceWithDeliveryOption = option => {
    let newTotalPrice = this.props.cartItemsSum
    newTotalPrice += option.price
    newTotalPrice = DataUtils.roundToTwoDecimalPlaces(newTotalPrice)

    this.setState(() => ({
      totalPrice: newTotalPrice
    }))
  }

  findDeliveryOptionByName = name =>
    this.props.deliveryOptions.find(
      o => o.name.substring(0, 2) === name.substring(0, 2)
    )

  isFormValid = () => {
    const form = document.getElementById('checkoutForm')
    let result = false
    if (form !== 'undefinded' && form !== null) {
      result = form.checkValidity()
    }
    return result
  }

  CheckoutView = () => {
    return (
      <Container>
        <Col sm={5} className='col-centered'>
          <Form
            id='checkoutForm'
            validated={this.state.shouldCheckFieldValidity}
          >
            <PersonalDataFormGroup
              checkoutData={this.props.checkoutData}
              onChange={this.handleTextFormGroupDataChange}
            />
            <PaymentFormGroup
              checkoutData={this.props.checkoutData}
              paymentMethods={this.props.paymentMethods}
              creditCardNumRegex={this.state.regex.creditCardNumber}
              creditCardExpDateRegex={this.state.regex.creditCardExpirationDate}
              selectedOption={this.props.checkoutData.paymentMethod.value}
              onPaymenthMethodChange={this.handlePaymentMethodChange}
              onChange={this.handleTextFormGroupDataChange}
            />
            <DeliveryFormGroup
              deliveryOptions={this.props.deliveryOptions}
              selectedOption={this.props.checkoutData.deliveryOption.selected}
              onChange={this.handleDeliveryOptionChange}
            />

            <h5 className='text-center'>
              {DataUtils.roundToTwoDecimalPlaces(
                this.props.cartItemsSum + this.state.deliveryPrice
              )}{' '}
              EUR
            </h5>
            <Row className='text-center pt-2'>
              <Col>
                <Link to={`info`}>
                  <Button onClick={this.handleButton}>Back</Button>
                </Link>
              </Col>
              <Col>
                <Link to={`summary`}>
                  <Button
                    disabled={!this.state.isFormValid}
                    onClick={this.handleButton}
                  >
                    Confirm
                  </Button>
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Container>
    )
  }

  render() {
    return <this.CheckoutView />
  }
}

CheckoutContainer.propTypes = {
  cartItemsSum: PropTypes.number,
  checkoutData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    paymentMethod: PropTypes.shape({
      value: PropTypes.string,
      selected: PropTypes.string
    }),
    creditCardNumber: PropTypes.string,
    creditCardExpirationDate: PropTypes.string,
    deliveryOption: PropTypes.shape({
      value: PropTypes.shape({
        name: PropTypes.string,
        price: PropTypes.number
      }),
      selected: PropTypes.string
    })
  }),
  paymentMethods: PropTypes.arrayOf(PropTypes.string),
  deliveryOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.num
    })
  ),
  routeUrl: PropTypes.string,
  onConfirmCheckoutData: PropTypes.func
}

export default CheckoutContainer
