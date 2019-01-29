import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Col, Row, Button, Modal } from "react-bootstrap";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  handleCloseModal = () => {
    this.props.onPurchaseComplete();
    this.setState({ showModal: false });
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  EndOfDemoModal = () => {
    return (
      <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Online shop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your purchases are completed. This is the end of demo version. You
          will be redirected fo main page.
        </Modal.Body>
        <Modal.Footer>
          <Link to="/">
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Ok
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    let checkoutData = this.props.checkoutData;
    let showCreditCardExtraFields =
      checkoutData.paymentMethod === "Credit Card";
    return (
      <Container>
        <Col sm={6}>
          <Row>
            <Col sm={6}>Name:</Col>
            <Col sm={6}>{checkoutData.name}</Col>
          </Row>
          <Row>
            <Col sm={6}>Email:</Col>
            <Col sm={6}>{checkoutData.email}</Col>
          </Row>
          <Row>
            <Col sm={6}>Address:</Col>
            <Col sm={6}>{checkoutData.address}</Col>
          </Row>
          <Row>
            <Col sm={6}>Payment method:</Col>
            <Col sm={6}>{checkoutData.paymentMethod}</Col>
          </Row>
          {showCreditCardExtraFields ? (
            <div>
              <Row>
                <Col sm={6}>Credit card number:</Col>
                <Col sm={6}>{checkoutData.creditCardNumber}</Col>
              </Row>
              <Row>
                <Col sm={6}>Credit card expiration date:</Col>
                <Col sm={6}>{checkoutData.creditCardExpirationDate}</Col>
              </Row>
            </div>
          ) : (
            ""
          )}
          <Row>
            <Col sm={6}>Delivery option:</Col>
            <Col sm={6}>
              {checkoutData.deliveryOption.name +
                " - " +
                checkoutData.deliveryOption.price}
            </Col>
          </Row>
          <Link to={`checkout`}>
            <Button>Back</Button>
          </Link>
          <Button onClick={this.handleShowModal}>Buy</Button>
        </Col>
        <this.EndOfDemoModal />
      </Container>
    );
  }
}

Summary.propTypes = {
  cartItemsSum: PropTypes.number,
  checkoutData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    paymentMethod: PropTypes.string,
    creditCardNumber: PropTypes.string,
    creditCardExpirationDate: PropTypes.string,
    deliveryOption: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.number
    })
  }),
  routeUrl: PropTypes.string,
  onPurchaseComplete: PropTypes.func
};

export default Summary;
