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
          <Link to="/online-shop/">
            <Button variant="primary" onClick={this.handleCloseModal}>
              Ok
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    );
  };

  SummaryRow = props => {
    return (
      <Row>
        <Col className="text-right">
          <h6>{props.name}</h6>
        </Col>
        <Col className="text-left">
          <h6>{props.value}</h6>
        </Col>
      </Row>
    );
  };

  render() {
    let checkoutData = this.props.checkoutData;
    let showCreditCardExtraFields =
      checkoutData.paymentMethod === "Credit Card";
    return (
      <Container>
        <Col xs={12} sm={5} className="col-centered text-center">
          <this.SummaryRow name={"Name:"} value={checkoutData.name} />
          <this.SummaryRow name={"Email:"} value={checkoutData.email} />
          <this.SummaryRow name={"Address:"} value={checkoutData.address} />
          <this.SummaryRow
            name={"Payment method:"}
            value={checkoutData.paymentMethod}
          />
          {showCreditCardExtraFields ? (
            <div>
              <this.SummaryRow
                name={"Credit card number:"}
                value={checkoutData.creditCardNumber}
              />
              <this.SummaryRow
                name={"Credit card expiration date:"}
                value={checkoutData.creditCardExpirationDate}
              />
            </div>
          ) : (
            ""
          )}
          <this.SummaryRow
            name={"Delivery option:"}
            value={
              checkoutData.deliveryOption.name +
              " - " +
              checkoutData.deliveryOption.price
            }
          />
          <this.SummaryRow
            name={"Price to pay:"}
            value={this.props.cartItemsSum + " EUR"}
          />
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
