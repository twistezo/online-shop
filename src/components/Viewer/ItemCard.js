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
        <Card.Img
          style={{ width: "5rem" }}
          variant="top"
          src={this.state.item.getImageSrc()}
        />
        <Card.Body>
          <Card.Title>{this.state.item.getName()}</Card.Title>
          <Card.Text>{this.state.item.getDescription()}</Card.Text>
          <Row>
            <Col>
              <Button variant="primary">Add to cart</Button>
            </Col>
            <Col>{this.state.item.getPrice() + " EUR"}</Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default ItemCard;
