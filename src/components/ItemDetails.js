import React, { Component } from "react";
import PropTypes from "prop-types";
import { Item } from "../data/DataGenerator";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Review } from "../data/DataGenerator";

const style = {
  backgroundColor: "lightGray",
  padding: "15px 15px 15px 15px"
};

class ItemDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImageNum: 0,
      newReviewName: "",
      newReviewText: ""
    };
  }

  handleThumbnailClick = imageNum => {
    this.setState(() => ({
      activeImageNum: imageNum
    }));
  };

  handleAddReviewClick = event => {
    if (this.state.newReviewName !== "" && this.state.newReviewText !== "") {
      this.props.onAddReview(
        new Review(
          this.state.newReviewName,
          new Date(),
          this.state.newReviewText
        ),
        this.props.item.id
      );
      this.setState(() => ({
        newReviewName: "",
        newReviewText: ""
      }));
    }
    event.preventDefault();
  };

  handleChangeReviewName = event => {
    this.setState(() => ({
      newReviewName: event.target.value
    }));
    event.persist();
    event.preventDefault();
  };

  handleChangeReviewText = event => {
    this.setState(() => ({
      newReviewText: event.target.value
    }));
    event.persist();
    event.preventDefault();
  };

  handleAddToCartClick = () => {
    this.props.onAddToCartClick(this.props.item.id);
  };

  Images = props => {
    return (
      <Container>
        <Row>
          <img
            alt=""
            style={{ height: "200px" }}
            src={props.imagesSources[props.activeImageNum]}
          />
        </Row>
        <Row>
          <this.Thumbnails sources={props.imagesSources} />
        </Row>
      </Container>
    );
  };

  Thumbnails = props => {
    let result = [];
    for (let i = 0; i < props.sources.length; i++) {
      result.push(
        <Col key={i}>
          <Button onClick={() => this.handleThumbnailClick(i)}>
            <img alt="" style={{ height: "20px" }} src={props.sources[i]} />
          </Button>
        </Col>
      );
    }
    return result;
  };

  Reviews = props => {
    let reviews = [];
    for (let i = 0; i < props.reviews.length; i++) {
      reviews.push(
        <Row key={i}>
          <Container>
            <Row>
              {props.reviews[i].name} -{" "}
              {props.reviews[i].date.toLocaleString("pl-PL", {
                day: "numeric",
                month: "numeric",
                year: "numeric"
              })}
            </Row>
            <Row>{props.reviews[i].text}</Row>
          </Container>
        </Row>
      );
    }
    return reviews;
  };

  FormToAddReview = () => {
    return (
      <Container>
        <h5>Add your review</h5>
        <Form>
          <Form.Group>
            <Form.Control
              required
              type="text"
              placeholder="Your name"
              minLength="2"
              maxLength="20"
              onChange={this.handleChangeReviewName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              required
              as="textarea"
              placeholder="Your review"
              rows="3"
              minLength="10"
              maxLength="250"
              onChange={this.handleChangeReviewText}
            />
          </Form.Group>
          <Form.Group>
            <Button onClick={this.handleAddReviewClick}>Submit</Button>
          </Form.Group>
        </Form>
      </Container>
    );
  };

  render() {
    let isOutOfStock = this.props.item.quantityOnStock === 0;
    return (
      <Container style={style}>
        <Row>
          <Col sm={6}>
            <this.Images
              imagesSources={this.props.item.imagesSources}
              activeImageNum={this.state.activeImageNum}
            />
          </Col>
          <Col sm={6}>
            <Row>
              <h3>Name: {this.props.item.name}</h3>
              <h5>Id: {this.props.item.id}</h5>
            </Row>
            <Row>
              <p>Description long:</p>
              <p>{this.props.item.descriptionLong}</p>
            </Row>
            <Row>
              <Col>
                <p>Quantity on stock: {this.props.item.quantityOnStock}</p>
              </Col>
              <Col>
                <Button
                  disabled={isOutOfStock}
                  onClick={this.handleAddToCartClick}
                >
                  Add to cart
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Container>
            <h5>Reviews</h5>
            <this.Reviews reviews={this.props.item.reviews} />
            <this.FormToAddReview />
          </Container>
        </Row>
      </Container>
    );
  }
}

ItemDetails.propTypes = {
  item: PropTypes.instanceOf(Item),
  onAddReview: PropTypes.func
};

export default ItemDetails;
