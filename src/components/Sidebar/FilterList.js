import React, { Component } from "react";
import { Form } from "react-bootstrap";

class FilterList extends Component {
  handleClick = filterName => {
    this.props.onItemClick(filterName);
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

export default FilterList;
