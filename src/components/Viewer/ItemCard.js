import React, { Component } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item
    };
  }

  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{this.state.item.getName()}</Card.Title>
          <Card.Text>{this.state.item.getDescription()}</Card.Text>
          <Row>
            <Col>
              <Button variant="primary">Add to cart</Button>
            </Col>
            <Col>{this.state.item.getPrice() + " PLN"}</Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default ItemCard;
