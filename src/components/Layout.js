import React, { Component } from "react";
import Menu from "./Menu/Menu";
import Sidebar from "./Sidebar/Sidebar";
import Viewer from "./Viewer/Viewer";
import DataFilter from "./DataFilter";
import { Container, Row, Col } from "react-bootstrap";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: {
        items: props.data.items,
        categories: props.data.categories
      },
      receivedData: {
        searchValue: "",
        activeCategory: "",
        activeFeatures: []
      },
      filteredData: {
        items: this.filterByCategoryAndFeature(
          props.data.items,
          props.data.categories[0].getName(),
          []
        )
      }
    };
  }

  handleSearchChange = searchValue => {
    let receivedData = this.state.receivedData;
    receivedData.searchValue = searchValue;

    let filteredData = this.state.filteredData;
    filteredData.items = this.filterBySearchValue(
      this.state.initialData.items,
      searchValue
    );

    this.setState(() => ({
      receivedData,
      filteredData
    }));
  };

  handleSidebarChange = (activeCategory, activeFeatures) => {
    let receivedData = this.state.receivedData;
    receivedData.activeCategory = activeCategory;
    receivedData.activeFeatures = activeFeatures;

    let filteredData = this.state.filteredData;
    filteredData.items = this.filterByCategoryAndFeature(
      this.state.initialData.items,
      activeCategory,
      activeFeatures
    );

    this.setState(() => ({
      receivedData,
      filteredData
    }));
  };

  filterByCategoryAndFeature(initialItems, activeCategory, activefeatures) {
    return new DataFilter(initialItems).filterByCategoryAndFeature(
      activeCategory,
      activefeatures
    );
  }

  filterBySearchValue(initialItems, itemName) {
    return new DataFilter(initialItems).filterBySearchValue(itemName);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={12}>
            <Menu onSearchChange={this.handleSearchChange} />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <Sidebar
              categories={this.state.initialData.categories}
              onSidebarChange={this.handleSidebarChange}
            />
          </Col>
          <Col sm={8}>
            <Viewer filteredItems={this.state.filteredData.items} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Layout;
