import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Menu from "./Menu/Menu";
import Sidebar from "./Sidebar/Sidebar";
import Viewer from "./Viewer/Viewer";
import DataFilter from "./DataFilter";
import Cart from "./Cart/Cart";
import ItemDetails from "./ItemDetails/ItemDetails";

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
        activeFeatures: [],
        activeItem: {}
      },
      filteredData: {
        items: this.filterByCategoryAndFeature(
          props.data.items,
          props.data.categories[0].name,
          []
        )
      }
    };
  }

  componentDidUpdate() {
    console.log(this.state.receivedData.activeItem);
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

  handleItemClick = item => {
    let receivedData = this.state.receivedData;
    receivedData.activeItem = item;
    this.setState(() => ({
      receivedData
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

  View = () => {
    return (
      <Row>
        <Col sm={4}>
          <Sidebar
            categories={this.state.initialData.categories}
            onSidebarChange={this.handleSidebarChange}
          />
        </Col>
        <Col sm={8}>
          <Viewer
            filteredItems={this.state.filteredData.items}
            onItemClick={this.handleItemClick}
          />
        </Col>
      </Row>
    );
  };

  ItemDetails = () => {
    return <ItemDetails item={this.state.receivedData.activeItem} />;
  };

  render() {
    return (
      <Router>
        <Container>
          <Row>
            <Col sm={12}>
              <Menu onSearchChange={this.handleSearchChange} />
            </Col>
          </Row>
          <Route exact path="/" component={this.View} />
          <Route path="/cart" component={Cart} />
          <Route
            // path={"/item-id="}
            path={"/item-id=" + this.state.receivedData.activeItem.id}
            component={this.ItemDetails}
          />
        </Container>
      </Router>
    );
  }
}

export default Layout;
