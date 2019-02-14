import React, { Component } from "react";
import PropTypes from "prop-types";
import { Pagination as BootstrapPagination } from "react-bootstrap";
import PaginationUtils from "./PaginationUtils";

class Pagination extends Component {
  handlePage = (props, pageChoiceOpt) => {
    let cardsData = props.cardsData;
    let activePage = cardsData.activePage;

    switch (pageChoiceOpt) {
      case "first":
        props.onItemClick(PaginationUtils.handlePage(cardsData, 0));
        break;
      case "last":
        props.onItemClick(
          PaginationUtils.handlePage(
            cardsData,
            PaginationUtils.getPagesLen(props.itemsLength, cardsData)
          )
        );
        break;
      case "prev":
        props.onItemClick(
          PaginationUtils.handlePage(cardsData, activePage - 1)
        );
        break;
      case "next":
        props.onItemClick(
          PaginationUtils.handlePage(cardsData, activePage + 1)
        );
        break;
      default:
    }
  };

  render() {
    const props = this.props;
    const isFirstPage = props.cardsData.activePage === 0;
    const isLastPage =
      props.cardsData.activePage ===
      PaginationUtils.getPagesLen(props.itemsLength, props.cardsData);
    return (
      <div>
        <BootstrapPagination className="pt-2 float-right">
          <BootstrapPagination.First
            disabled={isFirstPage}
            onClick={() => this.handlePage(props, "first")}
          />
          <BootstrapPagination.Prev
            disabled={isFirstPage}
            onClick={() => this.handlePage(props, "prev")}
          />
          <BootstrapPagination.Item active>
            {props.cardsData.activePage + 1}
          </BootstrapPagination.Item>
          <BootstrapPagination.Ellipsis disabled />
          <BootstrapPagination.Item
            onClick={() => this.handlePage(props, "last")}
          >
            {PaginationUtils.getPagesLen(props.itemsLength, props.cardsData) +
              1}
          </BootstrapPagination.Item>
          <BootstrapPagination.Next
            disabled={isLastPage}
            onClick={() => this.handlePage(props, "next")}
          />
        </BootstrapPagination>
      </div>
    );
  }
}

Pagination.propTypes = {
  itemsLength: PropTypes.number,
  cardsData: PropTypes.shape({
    rows: PropTypes.number,
    columns: PropTypes.number,
    activePage: PropTypes.number,
    firstItemNumOnActivePage: PropTypes.num
  }),
  onItemClick: PropTypes.func
};

export default Pagination;
