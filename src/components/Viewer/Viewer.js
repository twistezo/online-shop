import React, { Component } from "react";
import { Container } from "react-bootstrap";

import Pagination from "./Pagination";
import CustomCardGroups from "./CardGroups";

const style = {
  backgroundColor: "lightGray",
  padding: "15px 15px 15px 15px"
};

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsData: {
        rows: 2,
        columns: 2,
        activePage: 0,
        firstItemNumOnActivePage: 0
      }
    };
  }

  handleActivepage = cardsData => {
    this.setState(() => ({
      cardsData
    }));
  };

  render() {
    return (
      <Container style={style}>
        <CustomCardGroups
          items={this.props.filteredItems}
          cardsData={this.state.cardsData}
        />
        <Pagination
          itemsLength={this.props.filteredItems.length}
          cardsData={this.state.cardsData}
          onItemClick={this.handleActivepage}
        />
      </Container>
    );
  }
}

export default Viewer;
