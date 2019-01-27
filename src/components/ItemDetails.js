import React, { Component } from "react";
import PropTypes from "prop-types";
import { Item } from "../data/DataGenerator";

class ItemDetails extends Component {
  render() {
    return (
      <div>
        <h3>Item details</h3>
        <img
          alt=""
          style={{ height: "200px" }}
          src={this.props.item.imageSrc}
        />
        <h3>item name: {this.props.item.name}</h3>
        <h3>item id: {this.props.item.id}</h3>
      </div>
    );
  }
}

ItemDetails.propTypes = {
  item: PropTypes.instanceOf(Item)
};

export default ItemDetails;
