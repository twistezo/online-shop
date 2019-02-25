import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ListGroup } from 'react-bootstrap'

class CategoryList extends Component {
  handleClick = activeCategory => {
    this.props.onItemClick(activeCategory)
  }

  handleActive(value, index) {
    if (
      this.props.activeCategory === value ||
      (this.props.activeCategory === null && index === 0)
    )
      return 'active'
  }

  render() {
    return this.props.categoriesNames.map((c, index) => (
      <ListGroup.Item
        action
        onClick={() => {
          this.handleClick(c)
        }}
        className={this.handleActive(c, index)}
        key={c}
      >
        {c}
      </ListGroup.Item>
    ))
  }
}

CategoryList.propTypes = {
  categoriesNames: PropTypes.arrayOf(PropTypes.string),
  activeCategory: PropTypes.string,
  onItemClick: PropTypes.func
}

export default CategoryList
