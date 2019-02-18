import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Form, ListGroup } from "react-bootstrap";
import CategoryList from "./CategoryList";
import FeatureList from "./FeatureList";
import { Category } from "../../data/DataGenerator";

class SidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCategory: "",
      activeFeatures: []
    };
  }

  componentWillMount() {
    this.setState({
      activeCategory: "Category 0",
      activeFeatures: this.getFeaturesFromCategory("Category 0")
    });
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
    let newFeatures = [...this.state.activeFeatures];
    newFeatures.find(f => f.name === featureToSwitch).switchState();

    this.setState(() => ({
      activeFeatures: newFeatures
    }));
    this.props.onSidebarChange(this.state.activeCategory, newFeatures);
  };

  getFeaturesFromCategory(activeCategory) {
    return this.props.categories.find(c => c.name === activeCategory).features;
  }

  resetFeatures(activeFeatures) {
    activeFeatures.forEach(f => {
      f.state = false;
    });
  }

  render() {
    return (
      <Container>
        <ListGroup className="pb-3" variant="flush">
          <CategoryList
            categoriesNames={this.props.categories.map(c => c.name)}
            activeCategory={this.props.activeCategory}
            onItemClick={this.handleClickOnCategory}
          />
        </ListGroup>
        <Form className="pl-3">
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

SidebarContainer.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.instanceOf(Category)),
  activeCategory: PropTypes.string,
  onSidebarChange: PropTypes.func
};

export default SidebarContainer;
