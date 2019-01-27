import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import { Feature } from "../../data/DataGenerator";

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

FeatureList.propTypes = {
  features: PropTypes.arrayOf(PropTypes.instanceOf(Feature))
};

export default FeatureList;
