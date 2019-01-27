import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import Pagination from "./Pagination";
import CardGroups from "./CardGroups";
import { Item } from "../../data/DataGenerator";

const style = {
  backgroundColor: "lightGray",
  padding: "15px 15px 15px 15px"
};

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsData: {
        rows: props.viewerRows,
        columns: props.viewerColumns,
        activePage: 0,
        firstItemNumOnActivePage: 0
      }
    };
  }

  handleItemClick = item => {
    this.props.onItemClick(item);
  };

  handleActivepage = cardsData => {
    this.setState(() => ({
      cardsData
    }));
  };

  render() {
    return (
      <Container style={style}>
        <CardGroups
          items={this.props.filteredItems}
          cardsData={this.state.cardsData}
          onItemClick={this.handleItemClick}
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

Viewer.propTypes = {
  viewerRows: PropTypes.number,
  viewerColumns: PropTypes.number,
  filteredItems: PropTypes.arrayOf(PropTypes.instanceOf(Item)),
  onItemClick: PropTypes.func
};

export default Viewer;
