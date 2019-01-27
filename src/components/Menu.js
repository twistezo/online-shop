import React, { Component } from "react";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
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
            <Link to="/cart">
              <Button variant="primary">Cart</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Menu;
