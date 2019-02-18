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

  handleAddToCart = () => {
    this.props.onAddToCartClick(this.state.item.id);
  };

  render() {
    const isOutOfStock = this.state.item.quantityOnStock === 0;
    return (
      <Card>
        <Card.Img
          className="mx-auto d-block viewerCardImage"
          variant="top"
          src={this.state.item.imagesSources[0]}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{this.state.item.name}</Card.Title>
          <Card.Text>{this.state.item.descriptionShort}</Card.Text>
          <div className="mt-auto">
            <Row>
              <Col>
                <Link
                  to={
                    process.env.PUBLIC_URL +
                    "/item-details/item-id-" +
                    this.state.item.id
                  }
                >
                  <Button
                    className="float-left"
                    variant="primary"
                    onClick={this.handleDetailsClick}
                  >
                    <i className="fas fa-info" /> &nbsp; Details
                  </Button>
                </Link>
              </Col>
              <Col>
                <Button
                  className="float-right"
                  variant="primary"
                  disabled={isOutOfStock}
                  onClick={this.handleAddToCart}
                >
                  <i className="fas fa-cart-arrow-down" />
                </Button>
              </Col>
            </Row>
            <Row className="pt-3 text-center">
              <Col>
                {isOutOfStock ? "Out of stock" : this.state.item.price + " EUR"}
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

ItemCard.propTypes = {
  item: PropTypes.instanceOf(Item)
};

export default ItemCard;
