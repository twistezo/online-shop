import React, { Component } from "react";
import { Form } from "react-bootstrap";

class FilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: props.data
    };
  }

  // TODO: check if necessary
  componentWillReceiveProps() {
    this.setState((_state, props) => ({
      filters: props.data
    }));
  }

  // TODO: check if necessary
  componentDidMount() {
    this.setState(() => ({
      filters: this.props.data
    }));
  }

  handleClick = filterName => {
    let newFilters = this.state.filters;
    newFilters
      .find(f => {
        return f.name === filterName;
      })
      .switchState();

    this.setState(() => ({
      filters: newFilters
    }));
    this.props.onItemClick(newFilters);
  };

  render() {
    return this.state.filters.map(f => (
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
