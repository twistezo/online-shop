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
        activeCategory: props.data.categories[0].getName(),
        filters: []
      },
      filteredData: {
        items: props.data.items
      }
    };
  }

  // handleSearchChange = searchValue => {
  //   let receivedData = this.state.receivedData;
  //   receivedData.searchValue = searchValue;
  //   let filteredData = this.filterData(
  //     this.state.initialData.items,
  //     this.state.filteredData.activeCategory,
  //     this.state.filteredData.filters
  //   );
  //   this.setState(() => ({
  //     receivedData,
  //     filteredData
  //   }));
  //   console.log("handleSearchChange");
  // };

  handleSidebarChange = (activeCategory, filters) => {
    let receivedData = this.state.receivedData;
    receivedData.activeCategory = activeCategory;
    receivedData.filters = filters;
    // let filteredData = this.filterData(activeCategory, filters);

    let filteredData = this.state.filteredData;
    filteredData.items = new DataFilter(
      this.state.initialData.items,
      activeCategory,
      filters
    ).filter();

    this.setState(() => ({
      receivedData,
      filteredData
    }));
    // console.log(
    //   "--handleSidebarChange " + this.state.filteredData.items.length
    // );
  };

  // filterData(activeCategory, filters) {
  //   let filteredData = this.state.filteredData;
  //   filteredData.items = new DataFilter(
  //     this.state.initialData.items,
  //     activeCategory,
  //     filters
  //   ).filter();
  //   return filteredData;
  // }

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
