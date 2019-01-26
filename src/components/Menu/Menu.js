import React, { Component } from "react";
import { Row, Col, Button, Container, Form } from "react-bootstrap";

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

  handleSearchChange = event => {
    this.setState(() => ({
      searchValue: event.target.value
    }));
    this.props.onSearchChange(event.target.value);
    event.preventDefault();
  };

  render() {
    return (
      <Container style={style}>
        <Row>
          <Col>
            <Button variant="primary">Home</Button>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search"
              value={this.state.searchValue}
              onChange={this.handleSearchChange}
            />
          </Col>
          <Col>
            <Button variant="primary">Cart</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Menu;
