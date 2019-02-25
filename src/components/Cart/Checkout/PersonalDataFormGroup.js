import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextFormGroup from './TextFormGroup'

class PersonalDataFormGroup extends Component {
  handleChange = event => {
    this.props.onChange(event)
  }

  render() {
    return (
      <div>
        <TextFormGroup
          label={'Full name'}
          name={'name'}
          type={'text'}
          defaultValue={this.props.checkoutData.name}
          placeholder={'Ex. John Smith'}
          feedback={'This field is required.'}
          pattern={null}
          onChange={this.handleChange}
        />
        <TextFormGroup
          label={'Email'}
          name={'email'}
          type={'email'}
          defaultValue={this.props.checkoutData.email}
          placeholder={'example@gmail.com'}
          feedback={'Incorrect email format.'}
          pattern={null}
          onChange={this.handleChange}
        />
        <TextFormGroup
          label={'Address'}
          name={'address'}
          type={'text'}
          defaultValue={this.props.checkoutData.address}
          placeholder={'Street, city, postalcode'}
          feedback={'This field is required.'}
          pattern={null}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

PersonalDataFormGroup.propTypes = {
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
  onChange: PropTypes.func
}

export default PersonalDataFormGroup
