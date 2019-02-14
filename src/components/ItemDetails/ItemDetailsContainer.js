import React, { Component } from "react";
import PropTypes from "prop-types";
import { Item } from "../../data/DataGenerator";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Review } from "../../data/DataGenerator";
import Images from "./Images";
import ReviewsList from "./Reviews/ReviewsList";
import ReviewsForm from "./Reviews/ReviewsForm";

class ItemDetailsContainer extends Component {
  handleAddToCart = () => {
    this.props.onAddToCartClick(this.props.item.id);
  };

  handleAddReview = (name, review) => {
    this.props.onAddReview(
      new Review(name, new Date(), review),
      this.props.item.id
    );
  };

  render() {
    const isOutOfStock = this.props.item.quantityOnStock === 0;
    return (
      <Container>
        <Row>
          <Col className="pb-3" sm={6}>
            <Images imagesSources={this.props.item.imagesSources} />
          </Col>
          <Col sm={6}>
            <Container>
              <Row>
                <h3>{this.props.item.name}</h3>
              </Row>
              <Row>
                <p>Id: {this.props.item.id}</p>
              </Row>
              <Row className="text-justify">
                <p>{this.props.item.descriptionLong}</p>
              </Row>
              <Row>
                <Col className="align-self-center pl-0">
                  <span className="float-left">
                    On stock: {this.props.item.quantityOnStock}
                  </span>
                </Col>
                <Col className="pr-0">
                  <Button
                    className="float-right"
                    disabled={isOutOfStock}
                    onClick={this.handleAddToCart}
                  >
                    Add &nbsp; <i className="fas fa-cart-arrow-down" />
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row className="pt-3">
          <Container className="pl-15">
            <h4>Reviews</h4>
            <ReviewsList
              item={this.props.item}
              initialItems={this.props.initialItems}
            />
            <ReviewsForm onAddReview={this.handleAddReview} />
          </Container>
        </Row>
      </Container>
    );
  }
}

ItemDetailsContainer.propTypes = {
  initialItems: PropTypes.arrayOf(PropTypes.instanceOf(Item)),
  item: PropTypes.instanceOf(Item),
  onAddReview: PropTypes.func,
  onAddToCartClick: PropTypes.func
};

export default ItemDetailsContainer;
