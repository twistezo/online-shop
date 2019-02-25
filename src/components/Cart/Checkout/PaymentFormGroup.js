import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import TextFormGroup from './TextFormGroup'

class PaymentFormGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTotalPrice: false,
      showCreditCardExtraFields:
        this.props.checkoutData.paymentMethod.value === 'Credit Card'
    }
  }

  handleChange = event => {
    this.props.onChange(event)
  }

  handlePaymentMethodChange = event => {
    const showCreditCardExtraFields = event.target.value === 'Credit Card'
    this.setState(() => ({
      showCreditCardExtraFields
    }))
    this.props.onPaymenthMethodChange(event)
  }

  PaymentMethods = () => {
    let options = []
    this.props.paymentMethods.forEach((paymentMethod, i) => {
      options.push(
        <option key={i + 1} value={paymentMethod}>
          {paymentMethod}
        </option>
      )
    })
    return options
  }

  render() {
    return (
      <div>
        <Form.Group>
          <Form.Label>Payment method</Form.Label>
          <Form.Control
            as='select'
            defaultValue={this.props.selectedOption}
            onChange={this.handlePaymentMethodChange}
          >
            <this.PaymentMethods />
          </Form.Control>
        </Form.Group>
        {this.state.showCreditCardExtraFields && (
          <TextFormGroup
            label={'Credit card number'}
            name={'creditCardNumber'}
            type={'text'}
            defaultValue={this.props.checkoutData.creditCardNumber}
            placeholder={'Ex. 5500000000000004'}
            feedback={'Invalid format. Ex. 5500000000000004'}
            pattern={this.props.creditCardNumRegex}
            onChange={this.handleChange}
          />
        )}
        {this.state.showCreditCardExtraFields && (
          <TextFormGroup
            label={'Credit card expiration date'}
            name={'creditCardExpirationDate'}
            type={'text'}
            defaultValue={this.props.checkoutData.creditCardExpirationDate}
            placeholder={'Ex. 02/19'}
            feedback={'Invalid format. Ex. 02/19'}
            pattern={this.props.creditCardExpDateRegex}
            onChange={this.handleChange}
          />
        )}
      </div>
    )
  }
}

PaymentFormGroup.propTypes = {
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
  creditCardNumRegex: PropTypes.string,
  creditCardExpDateRegex: PropTypes.string,
  selectedOption: PropTypes.string,
  onPaymenthMethodChange: PropTypes.func,
  onChange: PropTypes.func
}

export default PaymentFormGroup
