import React, { Component } from "react";
import { Container, Form, ListGroup } from "react-bootstrap";
import CategoryList from "./CategoryList";
import FeatureList from "./FeatureList";

const style = {
  backgroundColor: "lightGray",
  padding: "15px 15px 15px 15px"
};

class SidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: "",
      activeFeatures: []
    };
  }

  handleClickOnCategory = activeCategory => {
    let activeFeatures = this.getFeaturesFromCategory(activeCategory);
    if (this.state.activeCategory !== activeCategory) {
      this.resetFeatures(activeFeatures);
    }

    this.setState(() => ({
      activeCategory,
      activeFeatures
    }));
    this.props.onSidebarChange(activeCategory, activeFeatures);
  };

  handleClickOnFeature = featureToSwitch => {
    let newFeatures = this.state.activeFeatures;
    newFeatures
      .find(f => {
        return f.name === featureToSwitch;
      })
      .switchState();

    this.setState(() => ({
      activeFeatures: newFeatures
    }));
    this.props.onSidebarChange(this.state.activeCategory, newFeatures);
  };

  getFeaturesFromCategory(activeCategory) {
    return this.props.categories.find(c => {
      return c.name === activeCategory;
    }).features;
  }

  resetFeatures(activeFeatures) {
    activeFeatures.forEach(f => {
      f.setState(false);
    });
  }

  render() {
    return (
      <Container style={style}>
        <ListGroup variant="flush">
          <CategoryList
            categoriesNames={this.props.categories.map(c => c.name)}
            activeCategory={this.props.activeCategory}
            onItemClick={this.handleClickOnCategory}
          />
        </ListGroup>
        <hr />
        <Form>
          <Form.Group>
            <FeatureList
              features={this.getFeaturesFromCategory(this.props.activeCategory)}
              onItemClick={this.handleClickOnFeature}
            />
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default SidebarContainer;
