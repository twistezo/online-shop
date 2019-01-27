import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Item } from "../../data/DataGenerator";

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item
    };
  }

  handleDetailsClick = () => {
    this.props.onItemClick(this.state.item);
  };

  handleAddToCart = () => {};

  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img
          style={{ width: "5rem" }}
          variant="top"
          src={this.state.item.imageSrc}
        />
        <Card.Body>
          <Card.Title>{this.state.item.name}</Card.Title>
          <Card.Text>{this.state.item.description}</Card.Text>
          <Row>
            <Col>
              <Link to={"/item-id-" + this.state.item.id}>
                <Button variant="primary" onClick={this.handleDetailsClick}>
                  Details
                </Button>
              </Link>
              <Button variant="primary" onClick={this.handleAddToCart}>
                Add to cart
              </Button>
            </Col>
            <Col>{this.state.item.price + " EUR"}</Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

ItemCard.propTypes = {
  item: PropTypes.instanceOf(Item),
  onItemClick: PropTypes.func
};

export default ItemCard;
