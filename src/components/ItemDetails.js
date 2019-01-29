import React, { Component } from "react";
import PropTypes from "prop-types";
import { Item } from "../data/DataGenerator";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { Review } from "../data/DataGenerator";

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
        <Row className="pt-4 align-items-center">
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
          <Button variant="light" onClick={() => this.handleThumbnailClick(i)}>
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
        <div key={i}>
          <Container className="pt-3">
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
        </div>
      );
    }
    return reviews;
  };

  FormToAddReview = () => {
    return (
      <div>
        <Col sm={6} className="pt-4 pl-0">
          <h4>Add your review</h4>
          <Form className="pt-3" validated={this.state.isFieldValidated}>
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
        </Col>
      </div>
    );
  };

  render() {
    let isOutOfStock = this.props.item.quantityOnStock === 0;
    return (
      <Container>
        <Row>
          <Col className="pb-3" sm={6}>
            <this.Images
              imagesSources={this.props.item.imagesSources}
              activeImageNum={this.state.activeImageNum}
            />
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
                    onClick={this.handleAddToCartClick}
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
