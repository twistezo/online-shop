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
            <Button variant="primary" onClick={this.handleCloseModal}>
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
        <Col xs={12} sm={5} className="col-centered text-center">
          <Row>
            <Col className="text-right">
              <h6>Name:</h6>
            </Col>
            <Col className="text-left">
              <h6>{checkoutData.name}</h6>
            </Col>
          </Row>
          <Row>
            <Col className="text-right">
              <h6>Email:</h6>
            </Col>
            <Col className="text-left">
              <h6>{checkoutData.email}</h6>
            </Col>
          </Row>
          <Row>
            <Col className="text-right">
              <h6>Address:</h6>
            </Col>
            <Col className="text-left">
              <h6>{checkoutData.address}</h6>
            </Col>
          </Row>
          <Row>
            <Col className="text-right">
              <h6>Payment method:</h6>
            </Col>
            <Col className="text-left">
              <h6>{checkoutData.paymentMethod}</h6>
            </Col>
          </Row>
          {showCreditCardExtraFields ? (
            <div>
              <Row>
                <Col className="text-right">
                  <h6>Credit card number:</h6>
                </Col>
                <Col className="text-left">
                  <h6>{checkoutData.creditCardNumber}</h6>
                </Col>
              </Row>
              <Row>
                <Col className="text-right">
                  <h6>Credit card expiration date:</h6>
                </Col>
                <Col className="text-left">
                  <h6>{checkoutData.creditCardExpirationDate}</h6>
                </Col>
              </Row>
            </div>
          ) : (
            ""
          )}
          <Row>
            <Col className="text-right">
              <h6>Delivery option:</h6>
            </Col>
            <Col className="text-left">
              <h6>
                {checkoutData.deliveryOption.name +
                  " - " +
                  checkoutData.deliveryOption.price}
              </h6>
            </Col>
          </Row>
          <Row className="text-center pt-2">
            <Col>
              <Link to={`checkout`}>
                <Button>Back</Button>
              </Link>
            </Col>
            <Col>
              <Button onClick={this.handleShowModal}>Buy</Button>
            </Col>
          </Row>
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
