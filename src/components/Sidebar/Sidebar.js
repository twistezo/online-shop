import React, { Component } from "react";
import { Container, Form, ListGroup } from "react-bootstrap";
import CategoryList from "./CategoryList";
import FilterList from "./FilterList";

const style = {
  backgroundColor: "lightGray",
  padding: "15px 15px 15px 15px"
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.initialActiveCategory = props.categories[0].getName();
    this.state = {
      categories: props.categories,
      activeCategory: this.initialActiveCategory,
      filters: this.getFiltersFromActiveCategory(
        props.categories,
        this.initialActiveCategory
      )
    };
  }

  getCategoriesNames(categories) {
    return categories.map(c => c.getName());
  }

  getFiltersNames(filters) {
    return filters.map(f => f.getName());
  }

  getFiltersFromActiveCategory(categories, activeCategory) {
    return categories
      .find(c => {
        return c.getName() === activeCategory;
      })
      .getFilters();
  }

  resetFilters(filters) {
    filters.forEach(f => {
      f.setState(false);
    });
  }

  handleClickOnCategory = activeCategory => {
    let filters = this.getFiltersFromActiveCategory(
      this.state.categories,
      activeCategory
    );
    if (this.state.activeCategory !== activeCategory) {
      this.resetFilters(filters);
    }
    this.setState(() => ({
      activeCategory,
      filters
    }));
    this.props.onSidebarChange(activeCategory, filters);
  };

  handleClickOnFilter = filterToSwitch => {
    let newFilters = this.state.filters;
    newFilters
      .find(f => {
        return f.name === filterToSwitch;
      })
      .switchState();
    this.setState(() => ({
      filters: newFilters
    }));
    this.props.onSidebarChange(this.state.activeCategory);
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
            <FilterList
              data={this.state.filters}
              onItemClick={this.handleClickOnFilter}
            />
          </Form.Group>
        </Form>
      </Container>
    );
  }
}

export default Sidebar;
