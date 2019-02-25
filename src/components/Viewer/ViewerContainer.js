import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'react-bootstrap'
import Pagination from './Pagination'
import CardGroups from './CardGroups'
import { Item } from '../../data/DataGenerator'

class Viewer extends Component {
  static viewerRows = 2
  static viewerColumns = 2

  constructor(props) {
    super(props)
    this.state = {
      cardsData: {
        rows: Viewer.viewerRows,
        columns: Viewer.viewerColumns,
        activePage: 0,
        firstItemNumOnActivePage: 0
      }
    }
  }

  handleActivepage = cardsData => {
    this.setState(() => ({
      cardsData
    }))
  }

  handleAddToCart = itemId => {
    this.props.onAddToCartClick(itemId)
  }

  render() {
    return (
      <Container>
        <CardGroups
          items={this.props.filteredItems}
          cardsData={this.state.cardsData}
          onAddToCartClick={this.handleAddToCart}
        />
        <Pagination
          itemsLength={this.props.filteredItems.length}
          cardsData={this.state.cardsData}
          onItemClick={this.handleActivepage}
        />
      </Container>
    )
  }
}

Viewer.propTypes = {
  filteredItems: PropTypes.arrayOf(PropTypes.instanceOf(Item))
}

export default Viewer
