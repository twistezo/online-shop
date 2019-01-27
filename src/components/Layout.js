import React, { Component } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import DataFilter from "./DataFilter";
import SidebarContainer from "./Sidebar/SidebarContainer";
import ViewerContainer from "./Viewer/ViewerContainer";
import ItemDetails from "./ItemDetails";
import Menu from "./Menu";
import Cart from "./Cart";
import { Item, Category } from "../data/DataGenerator";

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
        items: []
      },
      controllers: {
        viewerRows: 2,
        viewerColumns: 2,
        shouldExpandViewer: false
      }
    };
  }

  componentWillMount() {
    this.resetReceivedandFilteredData();
  }

  handleSearchChange = searchValue => {
    let receivedData = this.state.receivedData;
    receivedData.searchValue = searchValue;
    let filteredData = this.state.filteredData;
    filteredData.items = this.filterBySearchValue(
      this.state.initialData.items,
      searchValue
    );

    if (searchValue === "") {
      this.resetReceivedandFilteredData();
    } else {
      let controllers = this.state.controllers;
      controllers.shouldExpandViewer = true;
      this.setState(() => ({
        receivedData,
        filteredData,
        controllers
      }));
    }
  };

  handleHomeClick = () => {
    this.resetReceivedandFilteredData();
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
    this.resetReceivedandFilteredData();
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

  resetReceivedandFilteredData() {
    let receivedData = this.state.receivedData;
    receivedData.searchValue = "";
    receivedData.activeCategory = this.props.data.categories[0].name;
    receivedData.activeFeatures = [];
    receivedData.activeItem = {};
    let filteredData = this.state.filteredData;
    filteredData.items = this.filterByCategoryAndFeature(
      this.props.data.items,
      this.props.data.categories[0].name,
      []
    );
    let controllers = this.state.controllers;
    controllers.shouldExpandViewer = false;

    this.setState(() => ({
      receivedData,
      filteredData,
      controllers
    }));
  }

  View = () => {
    return (
      <Row>
        <Col sm={4}>
          <SidebarContainer
            categories={this.props.data.categories}
            activeCategory={this.state.receivedData.activeCategory}
            onSidebarChange={this.handleSidebarChange}
          />
        </Col>
        <Col sm={8}>
          <this.ViewerComponent
            rows={this.state.controllers.viewerRows}
            columns={this.state.controllers.viewerColumns}
          />
        </Col>
      </Row>
    );
  };

  ViewerComponent = props => {
    return (
      <ViewerContainer
        viewerRows={props.rows}
        viewerColumns={props.columns}
        filteredItems={this.state.filteredData.items}
        onItemClick={this.handleItemClick}
      />
    );
  };

  SearchResult = () => {
    return (
      <ViewerContainer
        filteredItems={this.state.filteredData.items}
        onItemClick={this.handleItemClick}
      />
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
              <Menu
                searchValue={this.state.receivedData.searchValue}
                onSearchChange={this.handleSearchChange}
                onHomeClick={this.handleHomeClick}
              />
            </Col>
          </Row>
          {this.state.controllers.shouldExpandViewer ? (
            <this.ViewerComponent
              rows={this.state.controllers.viewerRows + 1}
              columns={this.state.controllers.viewerColumns + 1}
            />
          ) : (
            <Route exact path="/" component={this.View} />
          )}
          <Route path="/cart" component={Cart} />
          <Route
            path={"/item-id-" + this.state.receivedData.activeItem.id}
            component={this.ItemDetails}
          />
        </Container>
      </Router>
    );
  }
}

Layout.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.instanceOf(Item)),
    categories: PropTypes.arrayOf(PropTypes.instanceOf(Category))
  })
};

export default Layout;
