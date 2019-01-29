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
      formData: {
        name: "",
        review: ""
      },
      formValidation: {
        name: false,
        review: false
      },
      isFormValid: false,
      isFieldValidated: false
    };
  }

  handleThumbnailClick = imageNum => {
    this.setState(() => ({
      activeImageNum: imageNum
    }));
  };

  handleAddToCartClick = () => {
    this.props.onAddToCartClick(this.props.item.id);
  };

  handleAddReviewClick = () => {
    this.props.onAddReview(
      new Review(
        this.state.formData.name,
        new Date(),
        this.state.formData.review
      ),
      this.props.item.id
    );
    this.setState(() => ({
      formData: {
        name: "",
        review: ""
      },
      formValidation: {
        name: false,
        review: false
      },
      isFormValid: false,
      isFieldValidated: false
    }));
  };

  handleInputChange = e => {
    let targetName = e.target.name;
    let targetValue = e.target.value;
    let isFieldValid = e.target.checkValidity() === true;
    let formValidation = this.state.formValidation;

    if (targetName === "name") {
      formValidation.name = isFieldValid;
      this.setState(() => ({
        formData: {
          ...this.state.formData,
          name: targetValue
        },
        formValidation,
        isFormValid: this.allFieldsAreValid(formValidation)
      }));
    } else if (targetName === "review") {
      formValidation.review = isFieldValid;
      this.setState(() => ({
        formData: {
          ...this.state.formData,
          review: targetValue
        },
        formValidation,
        isFormValid: this.allFieldsAreValid(formValidation)
      }));
    }
    this.setState({ isFieldValidated: true });
  };

  allFieldsAreValid = formValidaton =>
    Object.values(formValidaton).every(v => v === true);

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
    let itemWithUpdatedReviews = props.initialItems.find(
      i => i.id === props.item.id
    );
    let reviews = [];
    for (let i = 0; i < itemWithUpdatedReviews.reviews.length; i++) {
      reviews.push(
        <Row key={i}>
          <Container>
            <Row>
              {itemWithUpdatedReviews.reviews[i].name} -{" "}
              {itemWithUpdatedReviews.reviews[i].date.toLocaleString("pl-PL", {
                day: "numeric",
                month: "numeric",
                year: "numeric"
              })}
            </Row>
            <Row>{itemWithUpdatedReviews.reviews[i].text}</Row>
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
        <Form validated={this.state.isFieldValidated}>
          <Form.Group>
            <Form.Control
              name="name"
              value={this.state.formData.name}
              type="text"
              placeholder="Your name"
              required
              minLength="5"
              onChange={this.handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              This field is required. Min. characters is 5.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              name="review"
              value={this.state.formData.review}
              as="textarea"
              placeholder="Your review"
              rows="3"
              minLength="10"
              maxLength="250"
              required
              onChange={this.handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              This field is required. Min. characters: 10, max. 250.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Button
              disabled={!this.state.isFormValid}
              onClick={this.handleAddReviewClick}
            >
              Submit
            </Button>
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
            <this.Reviews
              item={this.props.item}
              initialItems={this.props.initialItems}
            />
            <this.FormToAddReview />
          </Container>
        </Row>
      </Container>
    );
  }
}

ItemDetails.propTypes = {
  initialItems: PropTypes.arrayOf(PropTypes.instanceOf(Item)),
  item: PropTypes.instanceOf(Item),
  onAddReview: PropTypes.func,
  onAddToCartClick: PropTypes.func
};

export default ItemDetails;
