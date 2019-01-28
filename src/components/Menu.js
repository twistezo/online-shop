import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Badge, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const style = {
  backgroundColor: "lightblue",
  padding: "15px 15px 15px 15px"
};

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
      <Container style={style}>
        <Row>
          <Col>
            <Link to="/">
              <Button variant="primary" onClick={this.handleHomeClick}>
                Home
              </Button>
            </Link>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search"
              value={this.props.searchValue}
              onChange={this.handleSearchChange}
            />
          </Col>
          <Col>
            <Link to="/cart/info">
              <Button variant="primary">
                Cart <Badge variant="light">{this.props.cartItemsLength}</Badge>
              </Button>
            </Link>
          </Col>
        </Row>
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
