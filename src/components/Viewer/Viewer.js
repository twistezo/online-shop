import React, { Component } from "react";
import { Container } from "react-bootstrap";

import CustomPagination from "./CustomPagination";
import CustomCardGroups from "./CustomCardGroups";

const style = {
  backgroundColor: "lightGray"
};

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items,
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
          items={this.state.items}
          cardsData={this.state.cardsData}
        />
        <CustomPagination
          itemsLength={this.state.items.length}
          cardsData={this.state.cardsData}
          onItemClick={this.handleActivepage}
        />
      </Container>
    );
  }
}

export default Viewer;
