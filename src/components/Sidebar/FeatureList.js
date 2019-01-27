import React, { Component } from "react";
import { Form } from "react-bootstrap";

class FeatureList extends Component {
  handleClick = featureName => {
    this.props.onItemClick(featureName);
  };

  render() {
    return this.props.features.map(f => (
      <Form.Check
        type="checkbox"
        label={f.name}
        key={f.name}
        onChange={() => {
          this.handleClick(f.name);
        }}
      />
    ));
  }
}

export default FeatureList;
