import React, { Component } from "react";
import { Pagination } from "react-bootstrap";

class CustomPagination extends Component {
  getFirstItemNumOnActivePage() {
    let itemsPerPage = this.props.cardsData.rows * this.props.cardsData.columns;
    let activePage = this.props.cardsData.activePage;
    let firstItemOnActivePage = this.props.cardsData.firstItemNumOnActivePage;

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
        this.props.itemsLength /
          (this.props.cardsData.rows * this.props.cardsData.columns)
      ) - 1
    );
  }

  handleFirstPage = () => {
    let cardsData = this.props.cardsData;
    this.handlePrevNextPage(cardsData, 0);
  };

  handleLastPage = () => {
    let cardsData = this.props.cardsData;
    this.handlePrevNextPage(cardsData, this.getPagesLen());
  };

  handlePrevPage = () => {
    let cardsData = this.props.cardsData;
    if (cardsData.activePage > 0) {
      let newActivPage = cardsData.activePage - 1;
      this.handlePrevNextPage(cardsData, newActivPage);
    }
  };

  handleNextPage = () => {
    let cardsData = this.props.cardsData;
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
    this.props.onItemClick(cardsData);
  }

  render() {
    let isFirstPage = this.props.cardsData.activePage === 0;
    let isLastPage = this.props.cardsData.activePage === this.getPagesLen();
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
            {this.props.cardsData.activePage + 1}
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
