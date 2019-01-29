import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Badge, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
  }

  handleHomeClick = () => {
    this.props.onHomeClick();
  };

  handleSearchChange = event => {
    this.setState(() => ({
      searchValue: event.target.value
    }));
    this.props.onSearchChange(event.target.value);
    event.persist();
    event.preventDefault();
  };

  render() {
    return (
      <Container className="menu">
        <Row>
          <Col xs={3} sm={4}>
            <Link to="/">
              <Button
                className="float-right"
                variant="primary"
                onClick={this.handleHomeClick}
              >
                <i className="fas fa-home" />
              </Button>
            </Link>
          </Col>
          <Col className="text-center" xs={6} sm={4}>
            <Form.Control
              type="text"
              placeholder="Search"
              value={this.props.searchValue}
              onChange={this.handleSearchChange}
            />
          </Col>
          <Col xs={3} sm={4}>
            <Link to="/cart/info">
              <Button variant="primary float-left">
                <i className="fas fa-shopping-cart" />
                "&nbsp;
                <Badge variant="primary">{this.props.cartItemsLength}</Badge>
              </Button>
            </Link>
          </Col>
        </Row>
        <hr />
      </Container>
    );
  }
}

Menu.propTypes = {
  searchValue: PropTypes.string,
  onSearchChange: PropTypes.func,
  onHomeClick: PropTypes.func
};

export default Menu;
