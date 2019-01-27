import React, { Component } from "react";
import { CardGroup as BootstrapCardGroup } from "react-bootstrap";
import ItemCard from "./ItemCard";

class CardGroups extends Component {
  CardGroups = () => {
    let rows = this.props.cardsData.rows;
    let firstItemOnActivePage = this.props.cardsData.firstItemNumOnActivePage;

    let cardGroups = [];
    for (let rowNum = 0; rowNum < rows; rowNum++) {
      let itemsGroup = [];
      for (let itemNum = 0; itemNum < this.props.cardsData.columns; itemNum++) {
        let item = this.props.items[firstItemOnActivePage];
        if (item !== undefined) {
          itemsGroup.push(<ItemCard item={item} key={item.getId()} />);
          firstItemOnActivePage += 1;
        }
        if (itemNum % rows === 0) {
          cardGroups.push(
            <BootstrapCardGroup key={rowNum}>{itemsGroup}</BootstrapCardGroup>
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

export default CardGroups;
