import { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { CartItem } from "../../data/DataGenerator";
// import { Container, Col, Button, Form } from "react-bootstrap";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  render() {
    return "Summary";
  }
}

Summary.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.instanceOf(CartItem))
};

export default Summary;
