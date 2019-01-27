import React, { Component } from "react";
import { Container, Form, ListGroup } from "react-bootstrap";
import CategoryList from "./CategoryList";
import FeatureList from "./FeatureList";

const style = {
  backgroundColor: "lightGray",
  padding: "15px 15px 15px 15px"
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.initialActiveCategory = props.categories[0].name;
    this.state = {
      categories: props.categories,
      activeCategory: this.initialActiveCategory,
      features: this.getFeaturesFromActiveCategory(
        props.categories,
        this.initialActiveCategory
      )
    };
  }

  getCategoriesNames(categories) {
    return categories.map(c => c.name);
  }

  getFeaturesNames(features) {
    return features.map(f => f.name);
  }

  getFeaturesFromActiveCategory(categories, activeCategory) {
    return categories.find(c => {
      return c.name === activeCategory;
    }).features;
  }

  resetFeatures(features) {
    features.forEach(f => {
      f.setState(false);
    });
  }

  handleClickOnCategory = activeCategory => {
    let features = this.getFeaturesFromActiveCategory(
      this.state.categories,
      activeCategory
    );
    if (this.state.activeCategory !== activeCategory) {
      this.resetFeatures(features);
    }

    this.setState(() => ({
      activeCategory,
      features
    }));
    this.props.onSidebarChange(activeCategory, features);
  };

  handleClickOnFeature = featureToSwitch => {
    let newFeatures = this.state.features;
    newFeatures
      .find(f => {
        return f.name === featureToSwitch;
      })
      .switchState();

    this.setState(() => ({
      features: newFeatures
    }));
    this.props.onSidebarChange(this.state.activeCategory, newFeatures);
  };

  render() {
    return (
      <Container style={style}>
        <ListGroup variant="flush">
          <CategoryList
            data={this.getCategoriesNames(this.state.categories)}
            onItemClick={this.handleClickOnCategory}
          />
        </ListGroup>
        <hr />
        <Form>
          <Form.Group>
            <FeatureList
              data={this.state.features}
              onItemClick={this.handleClickOnFeature}
            />
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default Sidebar;
