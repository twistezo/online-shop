import React, { Component } from "react";
import Menu from "./Menu/Menu";
import Sidebar from "./Sidebar/Sidebar";
import Viewer from "./Viewer/Viewer";
import { Container, Row, Col } from "react-bootstrap";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.data.items,
      categories: props.data.categories
    };
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={12}>
            <Menu />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Sidebar categories={this.state.categories} />
          </Col>
          <Col sm={8}>
            <Viewer items={this.state.items} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Layout;
