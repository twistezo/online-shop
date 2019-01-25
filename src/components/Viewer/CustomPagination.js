import React, { Component } from "react";
import { Pagination } from "react-bootstrap";

class CustomPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsLength: props.itemsLength,
      cardsData: props.cardsData
    };
  }

  getFirstItemNumOnActivePage() {
    let itemsPerPage = this.state.cardsData.rows * this.state.cardsData.columns;
    let activePage = this.state.cardsData.activePage;
    let firstItemOnActivePage = this.state.cardsData.firstItemNumOnActivePage;

    if (activePage === 0) {
      firstItemOnActivePage = 0;
    } else {
      firstItemOnActivePage = itemsPerPage * activePage;
    }
    return firstItemOnActivePage;
  }

  getPagesLen() {
    return (
      Math.ceil(
        this.state.itemsLength /
          (this.state.cardsData.rows * this.state.cardsData.columns)
      ) - 1
    );
  }

  handleFirstPage = () => {
    let cardsData = this.state.cardsData;
    this.handlePrevNextPage(cardsData, 0);
  };

  handleLastPage = () => {
    let cardsData = this.state.cardsData;
    this.handlePrevNextPage(cardsData, this.getPagesLen());
  };

  handlePrevPage = () => {
    let cardsData = this.state.cardsData;
    if (cardsData.activePage > 0) {
      let newActivPage = cardsData.activePage - 1;
      this.handlePrevNextPage(cardsData, newActivPage);
    }
  };

  handleNextPage = () => {
    let cardsData = this.state.cardsData;
    if (cardsData.activePage < this.getPagesLen()) {
      let newActivPage = cardsData.activePage + 1;
      this.handlePrevNextPage(cardsData, newActivPage);
    }
  };

  handlePrevNextPage(cardsData, newActivPage) {
    cardsData.activePage = newActivPage;
    cardsData.firstItemNumOnActivePage = this.getFirstItemNumOnActivePage(
      newActivPage
    );
    this.setState(() => ({
      cardsData
    }));
    this.props.onItemClick(cardsData);
  }

  render() {
    let isFirstPage = this.state.cardsData.activePage === 0;
    let isLastPage = this.state.cardsData.activePage === this.getPagesLen();
    return (
      <div>
        <Pagination>
          <Pagination.First
            disabled={isFirstPage}
            onClick={this.handleFirstPage}
          />
          <Pagination.Prev
            disabled={isFirstPage}
            onClick={this.handlePrevPage}
          />
          <Pagination.Item active>
            {this.state.cardsData.activePage + 1}
          </Pagination.Item>
          <Pagination.Ellipsis disabled />
          <Pagination.Item onClick={this.handleLastPage}>
            {this.getPagesLen() + 1}
          </Pagination.Item>
          <Pagination.Next
            disabled={isLastPage}
            onClick={this.handleNextPage}
          />
        </Pagination>
      </div>
    );
  }
}

export default CustomPagination;
