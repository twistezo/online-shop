import React, { Component } from "react";
import { Form } from "react-bootstrap";

class FeatureList extends Component {
  handleClick = featureName => {
    this.props.onItemClick(featureName);
  };

  render() {
    return this.props.data.map(f => (
      <Form.Check
        type="checkbox"
        label={f.getName()}
        key={f.getName()}
        onChange={() => {
          this.handleClick(f.getName());
        }}
      />
    ));
  }
}

export default FeatureList;
