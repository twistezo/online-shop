import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

class TextFormGroup extends Component {
  handleChange = event => {
    this.props.onChange(event);
    event.persist();
  };

  render() {
    return (
      <Form.Group>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control
          name={this.props.name}
          type={this.props.type}
          defaultValue={this.props.defaultValue}
          placeholder={this.props.placeholder}
          required={true}
          onChange={this.handleChange}
          pattern={this.props.pattern}
        />
        <Form.Control.Feedback type="invalid">
          {this.props.feedback}
        </Form.Control.Feedback>
      </Form.Group>
    );
  }
}

TextFormGroup.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  feedback: PropTypes.string,
  pattern: PropTypes.string,
  onChange: PropTypes.func
};

export default TextFormGroup;
