import React, { Component } from "react";
import { Container, Form, ListGroup } from "react-bootstrap";
import CategoryList from "./CategoryList";
import FilterList from "./FilterList";

const style = {
  backgroundColor: "lightGray"
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

  handleClickOnCategory = activeCategory => {
    this.setState(() => ({
      activeCategory,
      filters: this.getFiltersFromActiveCategory(
        this.state.categories,
        activeCategory
      )
    }));
  };

  handleClickOnFilter = filters => {
    this.setState(() => ({
      filters
    }));
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
