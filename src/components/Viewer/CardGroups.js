import React, { Component } from "react";
import { CardDeck } from "react-bootstrap";
import { Item } from "../../data/DataGenerator";
import PropTypes from "prop-types";
import ItemCard from "./ItemCard";

class CardGroups extends Component {
  handleItemClick = item => {
    this.props.onItemClick(item);
  };

  handleAddToCartClick = itemId => {
    this.props.onAddToCartClick(itemId);
  };

  CardGroups = () => {
    let rows = this.props.cardsData.rows;
    let firstItemOnActivePage = this.props.cardsData.firstItemNumOnActivePage;

    let cardGroups = [];
    for (let rowNum = 0; rowNum < rows; rowNum++) {
      let itemsGroup = [];
      for (let itemNum = 0; itemNum < this.props.cardsData.columns; itemNum++) {
        let item = this.props.items[firstItemOnActivePage];
        if (item !== undefined) {
          itemsGroup.push(
            <ItemCard
              item={item}
              key={item.id}
              onItemClick={this.handleItemClick}
              onAddToCartClick={this.handleAddToCartClick}
            />
          );
          firstItemOnActivePage += 1;
        }
        if (itemNum % rows === 0) {
          cardGroups.push(
            <CardDeck className="pb-2" key={rowNum}>
              {itemsGroup}
            </CardDeck>
          );
        }
      }
    }
    return cardGroups;
  };

  render() {
    return <this.CardGroups />;
  }
}

CardGroups.propTypes = {
  items: PropTypes.arrayOf(PropTypes.instanceOf(Item)),
  cardsData: PropTypes.shape({
    rows: PropTypes.number,
    columns: PropTypes.number,
    activePage: PropTypes.number,
    firstItemNumOnActivePage: PropTypes.num
  })
};

export default CardGroups;
