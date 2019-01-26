import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      activeCategory: null
    };
  }

  handleClick = activeCategory => {
    this.setState(() => ({
      activeCategory
    }));
    this.props.onItemClick(activeCategory);
  };

  handleActive(value, index) {
    if (
      this.state.activeCategory === value ||
      (this.state.activeCategory === null && index === 0)
    )
      return "active";
  }

  render() {
    return this.state.data.map((c, index) => (
      <ListGroup.Item
        action
        onClick={() => {
          this.handleClick(c);
        }}
        className={this.handleActive(c, index)}
        key={c}
      >
        {c}
      </ListGroup.Item>
    ));
  }
}

export default CategoryList;
