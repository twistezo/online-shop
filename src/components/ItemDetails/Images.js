import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "react-bootstrap";

class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeImageNum: 0
    };
  }

  onThumbnailClick = imageNum => {
    this.setState(() => ({
      activeImageNum: imageNum
    }));
  };

  Thumbnails = props => {
    let result = [];
    props.sources.forEach((source, i) => {
      result.push(
        <Col key={i}>
          <Button variant="light" onClick={() => this.onThumbnailClick(i)}>
            <img alt="" style={{ height: "20px" }} src={source} />
          </Button>
        </Col>
      );
    });
    return result;
  };

  render() {
    return (
      <Container>
        <Row>
          <img
            className="itemDetailsImage"
            alt=""
            src={this.props.imagesSources[this.state.activeImageNum]}
          />
        </Row>
        <Row className="pt-4 align-items-center">
          <this.Thumbnails sources={this.props.imagesSources} />
        </Row>
      </Container>
    );
  }
}

Images.propTypes = {
  imagesSources: PropTypes.arrayOf(PropTypes.string)
};

export default Images;
