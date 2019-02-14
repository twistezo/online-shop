import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

class DeliveryFormGroup extends Component {
  handleChange = event => {
    this.props.onChange(event);
  };

  DeliveryOptions = () => {
    let options = [];
    this.props.deliveryOptions.forEach((deliveryOption, i) => {
      options.push(
        <option key={i + 1} value={deliveryOption.name}>
          {deliveryOption.name + " - " + deliveryOption.price + " EUR"}
        </option>
      );
    });
    return options;
  };

  render() {
    return (
      <Form.Group>
        <Form.Label>Delivery option</Form.Label>
        <Form.Control
          as="select"
          defaultValue={this.props.selectedOption}
          onChange={this.handleChange}
        >
          <this.DeliveryOptions />
        </Form.Control>
      </Form.Group>
    );
  }
}

DeliveryFormGroup.propTypes = {
  deliveryOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.num
    })
  ),
  selectedOption: PropTypes.string,
  onDeliveryOptionChange: PropTypes.func
};

export default DeliveryFormGroup;
