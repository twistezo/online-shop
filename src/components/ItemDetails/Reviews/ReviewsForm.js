import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Button, Form } from "react-bootstrap";

class ReviewsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleAddReviewClick = () => {
    this.props.onAddReview(
      this.state.formData.name,
      this.state.formData.review
    );
    this.resetFormState();
  };

  handleFormInputChange = e => {
    const targetName = e.target.name;
    const targetValue = e.target.value;
    const isFieldValid = e.target.checkValidity() === true;
    let formValidation = { ...this.state.formValidation };
    formValidation[targetName] = isFieldValid;

    this.setState(() => ({
      formData: {
        ...this.state.formData,
        [targetName]: targetValue
      },
      formValidation,
      isFormValid: Object.values(formValidation).every(v => v === true),
      isFieldValidated: true
    }));
  };

  resetFormState() {
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
  }

  render() {
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
                onChange={this.handleFormInputChange}
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
                onChange={this.handleFormInputChange}
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
  }
}

ReviewsForm.propTypes = {
  onAddReview: PropTypes.func
};

export default ReviewsForm;
